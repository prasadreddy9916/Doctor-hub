from rest_framework.permissions import BasePermission, IsAuthenticated
from .models import Doctor


class IsApprovedDoctor(IsAuthenticated):
    """Permission to check if the user is an approved doctor"""
    
    def has_permission(self, request, view):
        if not super().has_permission(request, view):
            return False
        
        try:
            doctor = Doctor.objects.get(user=request.user)
            return doctor.status == 'APPROVED'
        except Doctor.DoesNotExist:
            return False


class IsAdmin(BasePermission):
    """Permission to check if the user is a superuser/admin"""
    
    def has_permission(self, request, view):
        return request.user and request.user.is_superuser


class IsAdminOrReadOnly(BasePermission):
    """Allow admins to edit, read-only for others"""
    
    def has_permission(self, request, view):
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        return request.user and request.user.is_superuser


class CanViewOwnContent(BasePermission):
    """Allow doctors to view only content they have access to"""
    
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated
    
    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True
        
        # Check if the doctor has access to the content
        try:
            doctor = Doctor.objects.get(user=request.user)
            from apps.access_control.models import Access
            return Access.objects.filter(doctor=doctor, content=obj).exists()
        except Doctor.DoesNotExist:
            return False
