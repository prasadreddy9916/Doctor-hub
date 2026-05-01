from rest_framework import serializers
from apps.accounts.models import Doctor
from .models import DoctorProfile


class DoctorProfileSerializer(serializers.ModelSerializer):
    doctor = serializers.PrimaryKeyRelatedField(read_only=True)
    doctor_name = serializers.CharField(source='doctor.name', required=False, allow_blank=True)
    doctor_email = serializers.CharField(source='doctor.email', read_only=True)
    doctor_contact_number = serializers.CharField(source='doctor.contact_number', required=False, allow_blank=True)
    doctor_license_no = serializers.CharField(source='doctor.license_no', required=False, allow_blank=True)
    doctor_specialization = serializers.CharField(source='doctor.specialization', required=False, allow_blank=True)
    doctor_hospital = serializers.CharField(source='doctor.hospital', required=False, allow_blank=True)
    doctor_status = serializers.CharField(source='doctor.status', read_only=True)
    doctor_created_at = serializers.DateTimeField(source='doctor.created_at', read_only=True)
    doctor_updated_at = serializers.DateTimeField(source='doctor.updated_at', read_only=True)

    class Meta:
        model = DoctorProfile
        fields = [
            'id', 'doctor', 'doctor_name', 'doctor_email', 'doctor_contact_number',
            'doctor_license_no', 'doctor_specialization', 'doctor_hospital', 'doctor_status',
            'doctor_created_at', 'doctor_updated_at',
            'degree', 'university', 'registration_number', 'years_experience',
            'clinic_name', 'clinic_address', 'phone_number', 'certificate_url',
            'identity_proof_url', 'profile_completed', 'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'created_at', 'updated_at', 'doctor', 'doctor_email',
            'doctor_status', 'doctor_created_at', 'doctor_updated_at'
        ]

    def update(self, instance, validated_data):
        doctor_data = validated_data.pop('doctor', {})
        instance = super().update(instance, validated_data)
        if doctor_data:
            Doctor.objects.filter(pk=instance.doctor.pk).update(**doctor_data)
            for attr, value in doctor_data.items():
                setattr(instance.doctor, attr, value)
        return instance

    def create(self, validated_data):
        doctor_data = validated_data.pop('doctor', {})
        request = self.context.get('request')
        doctor = getattr(request.user, 'doctor', None)
        profile = DoctorProfile.objects.create(doctor=doctor, **validated_data)
        if doctor_data and doctor:
            Doctor.objects.filter(pk=doctor.pk).update(**doctor_data)
            for attr, value in doctor_data.items():
                setattr(profile.doctor, attr, value)
        return profile
