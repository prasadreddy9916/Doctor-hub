from rest_framework import serializers
from .models import Access

class AccessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Access
        # Explicitly list all valid fields
        fields = ['id', 'doctor', 'content', 'granted_at']
        read_only_fields = ['granted_at']