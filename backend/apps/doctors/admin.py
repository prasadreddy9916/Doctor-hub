from django.contrib import admin
from .models import DoctorProfile


@admin.register(DoctorProfile)
class DoctorProfileAdmin(admin.ModelAdmin):
    list_display = ['doctor', 'degree', 'years_experience', 'profile_completed', 'updated_at']
    list_filter = ['profile_completed', 'degree', 'updated_at']
    search_fields = ['doctor__name', 'registration_number', 'clinic_name']
    readonly_fields = ['created_at', 'updated_at']
    fields = ['doctor', 'degree', 'university', 'registration_number', 'years_experience',
              'clinic_name', 'clinic_address', 'phone_number', 'certificate_url',
              'identity_proof_url', 'profile_completed', 'created_at', 'updated_at']
