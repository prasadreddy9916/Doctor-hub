from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from apps.accounts.models import Doctor
from apps.accounts.permissions import IsAdmin, IsApprovedDoctor
from apps.access_control.models import Access
from .models import Content
from .serializers import ContentSerializer


# 📌 1. CONTENT LIBRARY (ALL CONTENT FOR EVERYONE)
class ContentListCreateView(generics.ListCreateAPIView):
    serializer_class = ContentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Admin → all content
        Doctor → also all content (lock handled in serializer)
        """
        return Content.objects.all().order_by('-created_at')

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated(), IsAdmin()]
        return [IsAuthenticated()]  # both admin & doctor can view

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class MyAccessContentView(generics.ListAPIView):
    serializer_class = ContentSerializer
    permission_classes = [IsAuthenticated, IsApprovedDoctor]

    def get_queryset(self):
        try:
            doctor = Doctor.objects.get(user=self.request.user)

            accessible_content_ids = Access.objects.filter(
                doctor=doctor
            ).values_list('content_id', flat=True)

            return Content.objects.filter(
                id__in=accessible_content_ids
            ).order_by('-created_at')

        except Doctor.DoesNotExist:
            return Content.objects.none()


# 📌 3. DETAIL VIEW (ADMIN CONTROL)
class ContentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ContentSerializer
    permission_classes = [IsAdmin]

    def get_queryset(self):
        return Content.objects.all()