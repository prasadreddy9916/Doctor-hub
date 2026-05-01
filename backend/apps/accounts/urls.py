from django.urls import path
from .views import DoctorRegistrationView, DoctorListView, DoctorDetailView, LoginView,AdminStatsView

urlpatterns = [
    path('register/', DoctorRegistrationView.as_view(), name='doctor-register'),
    path('login/', LoginView.as_view(), name='login'),
    path('doctors/', DoctorListView.as_view(), name='doctor-list'),
    path('doctors/<int:pk>/', DoctorDetailView.as_view(), name='doctor-detail'),
    path('stats/', AdminStatsView.as_view()),
]