from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator

phone_validator = RegexValidator(
    regex=r'^\+91\d{10}$',
    message="Enter a valid Indian number like +919876543210"
)


class Doctor(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE) 
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    contact_number = models.CharField(
        max_length=13,
        validators=[phone_validator],
        unique=True, null=True
    )
    license_no = models.CharField(max_length=100, unique=True)
    specialization = models.CharField(max_length=255, blank=True)
    hospital = models.CharField(max_length=255, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
