from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
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


class ContentTypeCountView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Count content by type
        video_count = Content.objects.filter(type='video').count()
        image_count = Content.objects.filter(type='image').count()
        seminar_count = Content.objects.filter(type='seminar').count()

        data = {
            'video': video_count,
            'image': image_count,
            'seminar': seminar_count,
        }
        return Response(data)
    

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db.models import Count
from apps.accounts.models import Doctor
from apps.content.models import Content

class PublicHomeStatsView(APIView):
    permission_classes = [AllowAny]  # Public access

    def get(self, request):
        # 1. Get Doctors Count
        total_doctors = Doctor.objects.count()

        # 2. Get Content Type Counts
        content_counts = Content.objects.values('type').annotate(count=Count('id'))
        
        video_count = 0
        image_count = 0
        seminar_count = 0
        
        for item in content_counts:
            if item['type'] == 'video':
                video_count = item['count']
            elif item['type'] == 'image':
                image_count = item['count']
            elif item['type'] == 'seminar':
                seminar_count = item['count']

        return Response({
            'totalDoctors': total_doctors,
            'video': video_count,
            'image': image_count,
            'seminar': seminar_count,
            # We can send dummy data for admin-specific fields so the store doesn't break
            'pendingApprovals': 0, 
            'totalContent': 0, 
        })
    