from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from apps.accounts.permissions import IsAdmin
from .models import Access
from .serializers import AccessSerializer
from rest_framework import status

class AccessListCreateView(generics.ListCreateAPIView):
    """
    Handles List (GET) and Create (POST).
    """
    queryset = Access.objects.all()
    serializer_class = AccessSerializer
    permission_classes = [IsAdmin]

    def create(self, request, *args, **kwargs):
        """
        Safe Create method with explicit validation.
        """
        serializer = self.get_serializer(data=request.data)
        
        # ✅ FIX: Run validation explicitly
        # This catches unique constraint errors before DB hit
        if not serializer.is_valid():
            # If validation fails (e.g., duplicate access), return 400
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # Save if valid
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class AccessDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Handles Update (PUT/PATCH) and Delete (DELETE).
    """
    queryset = Access.objects.all()
    serializer_class = AccessSerializer
    permission_classes = [IsAdmin]