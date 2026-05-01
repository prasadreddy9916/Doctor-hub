from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Doctor

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class DoctorSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Doctor
        fields = '__all__'

class DoctorRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Doctor
        fields = ['name', 'email','contact_number', 'license_no', 'specialization', 'hospital', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        doctor = Doctor.objects.create(
            user=user,
            name=validated_data['name'],
            email=validated_data['email'],
            contact_number=validated_data['contact_number'],
            license_no=validated_data['license_no'],
            specialization=validated_data.get('specialization', ''),
            hospital=validated_data.get('hospital', ''),
        )
        return doctor