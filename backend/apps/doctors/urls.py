from django.urls import path
from .views import DoctorProfileListView, DoctorProfileDetailView, DoctorProfileCreateView

urlpatterns = [
    path('profile/', DoctorProfileDetailView.as_view(), name='doctor-profile-detail'),
    path('profile/create/', DoctorProfileCreateView.as_view(), name='doctor-profile-create'),
    path('profiles/', DoctorProfileListView.as_view(), name='doctor-profiles-list'),  # Admin only
]
