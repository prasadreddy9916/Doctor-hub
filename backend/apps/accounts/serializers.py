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
    specialization = serializers.CharField(required=False, allow_blank=True)
    hospital = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = Doctor
        fields = ['name', 'email','contact_number', 'license_no', 'specialization', 'hospital', 'password']

    def create(self, validated_data):
        # Extract password and optional fields
        password = validated_data.pop('password')
        email = validated_data.pop('email')
        name = validated_data.pop('name')
        contact_number = validated_data.pop('contact_number')
        license_no = validated_data.pop('license_no')
        specialization = validated_data.pop('specialization', '')
        hospital = validated_data.pop('hospital', '')
        
        # Create User
        user = User.objects.create_user(
            username=email,
            email=email,
            password=password
        )
        
        # Create Doctor
        doctor = Doctor.objects.create(
            user=user,
            name=name,
            email=email,
            contact_number=contact_number,
            license_no=license_no,
            specialization=specialization,
            hospital=hospital,
        )
        return doctor