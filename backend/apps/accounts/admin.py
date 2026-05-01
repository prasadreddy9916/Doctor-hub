from django.contrib import admin
from .models import Doctor

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'license_no', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['name', 'email', 'license_no']
    actions = ['approve_doctors', 'reject_doctors']
    readonly_fields = ['created_at', 'updated_at']

    def approve_doctors(self, request, queryset):
        queryset.update(status='APPROVED')
    approve_doctors.short_description = 'Approve selected doctors'

    def reject_doctors(self, request, queryset):
        queryset.update(status='REJECTED')
    reject_doctors.short_description = 'Reject selected doctors'
