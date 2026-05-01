from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Doctor
from .serializers import DoctorSerializer, DoctorRegistrationSerializer
from .permissions import IsAdmin, IsApprovedDoctor

from apps.content.models import Content



class DoctorRegistrationView(generics.CreateAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorRegistrationSerializer
    permission_classes = [AllowAny]

class DoctorListView(generics.ListAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [IsAdmin]  # Only admins can view all doctors

class DoctorDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [IsAuthenticated]

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(username=email, password=password)
        if user:
            # Superuser/admin login
            if user.is_superuser:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'admin': True,
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email,
                         'first_name': user.first_name,  
                        'last_name': user.last_name     
                    }
                })

            doctor = Doctor.objects.filter(user=user).first()
            if doctor and doctor.status == 'APPROVED':
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'doctor': DoctorSerializer(doctor).data
                })
            elif doctor:
                return Response({'error': 'Account not approved'}, status=status.HTTP_403_FORBIDDEN)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    


# counts Admin Dashboard
class AdminStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_superuser:
            return Response({"error": "Unauthorized"}, status=403)

        total_doctors = Doctor.objects.count()
        pending_approvals = Doctor.objects.filter(status='PENDING').count()
        total_content = Content.objects.count()

        return Response({
            "total_doctors": total_doctors,
            "pending_approvals": pending_approvals,
            "total_content": total_content
        })