from django.db import models
from apps.accounts.models import Doctor


class DoctorProfile(models.Model):
    doctor = models.OneToOneField(Doctor, on_delete=models.CASCADE, related_name='profile')
    
    # Education & Qualifications
    degree = models.CharField(max_length=255, blank=True)  # MBBS, MD, etc.
    university = models.CharField(max_length=255, blank=True)
    registration_number = models.CharField(max_length=100, unique=True)
    
    # Professional Details
    years_experience = models.IntegerField(default=0)
    clinic_name = models.CharField(max_length=255, blank=True)
    clinic_address = models.TextField(blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    
    # Documents
    certificate_url = models.URLField(blank=True)  # License certificate
    identity_proof_url = models.URLField(blank=True)
    
    # Profile Status
    profile_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.doctor.name} - Profile"
