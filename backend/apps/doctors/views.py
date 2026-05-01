from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from apps.accounts.permissions import IsApprovedDoctor, IsAdmin
from .models import DoctorProfile
from .serializers import DoctorProfileSerializer


class DoctorProfileListView(generics.ListAPIView):
    """Admin can view all doctor profiles"""
    queryset = DoctorProfile.objects.all()
    serializer_class = DoctorProfileSerializer
    permission_classes = [IsAdmin]


class DoctorProfileDetailView(generics.RetrieveUpdateAPIView):
    """Doctors can update their own profile, admins can view all"""
    queryset = DoctorProfile.objects.all()
    serializer_class = DoctorProfileSerializer
    permission_classes = [IsApprovedDoctor]
    
    def get_object(self):
        # Allow doctors to access only their own profile
        try:
            return DoctorProfile.objects.get(doctor__user=self.request.user)
        except DoctorProfile.DoesNotExist:
            return DoctorProfile.objects.create(doctor=self.request.user.doctor)


class DoctorProfileCreateView(generics.CreateAPIView):
    """Create doctor profile after registration"""
    queryset = DoctorProfile.objects.all()
    serializer_class = DoctorProfileSerializer
    permission_classes = [IsApprovedDoctor]

    def perform_create(self, serializer):
        serializer.save(doctor=self.request.user.doctor)

