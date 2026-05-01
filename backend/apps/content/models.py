from django.db import models
from django.contrib.auth.models import User

class Content(models.Model):
    TYPE_CHOICES = [
        ('video', 'Video'),
        ('image', 'Image'),
        ('seminar', 'Seminar'),
    ]
    
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to='content_files/', blank=True, null=True)
    file_url = models.URLField(blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
