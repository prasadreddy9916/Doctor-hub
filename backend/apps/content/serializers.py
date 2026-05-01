from rest_framework import serializers
from .models import Content
from apps.access_control.models import Access
from apps.accounts.models import Doctor


class ContentSerializer(serializers.ModelSerializer):

    doctors = serializers.PrimaryKeyRelatedField(
        queryset=Doctor.objects.all(),
        many=True,
        write_only=True,
        required=False
    )

    file = serializers.FileField(required=False, allow_null=True, write_only=True)
    file_url = serializers.URLField(required=False, allow_blank=True)

    access_list = serializers.SerializerMethodField()
    is_accessible = serializers.SerializerMethodField()

    class Meta:
        model = Content
        fields = [
            'id', 'title', 'type', 'description',
            'file', 'file_url', 'created_by',
            'created_at', 'updated_at',
            'doctors', 'access_list',
            'is_accessible'
        ]
        read_only_fields = [
            'id', 'created_by', 'created_at',
            'updated_at', 'access_list', 'is_accessible'
        ]

    # ✅ FILE URL HANDLING
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get('request')

        final_url = instance.file_url

        if instance.file:
            final_url = instance.file.url
            if request:
                final_url = request.build_absolute_uri(final_url)

        representation['file_url'] = final_url
        representation.pop('file', None)

        return representation

    # ✅ ACCESS CHECK (FOR DOCTOR UI)
    def get_is_accessible(self, obj):
        request = self.context.get('request')

        if request.user.is_superuser:
            return True

        try:
            doctor = Doctor.objects.get(user=request.user)

            return Access.objects.filter(
                doctor=doctor,
                content=obj
            ).exists()

        except Doctor.DoesNotExist:
            return False

    # 🔥🔥🔥 CRITICAL FIX HERE
    def get_access_list(self, obj):
        access_records = Access.objects.filter(content=obj).select_related('doctor')

        return [
            {
                'id': a.id,   # ✅ VERY IMPORTANT (for delete API)
                'doctor_id': a.doctor.id,
                'doctor_name': a.doctor.name,
                'granted_at': a.granted_at
            }
            for a in access_records
        ]

    # ✅ CREATE CONTENT + ACCESS
    def create(self, validated_data):
        doctors = validated_data.pop('doctors', [])

        request = self.context.get('request')
        if request and request.user:
            validated_data['created_by'] = request.user

        content = Content.objects.create(**validated_data)

        # prevent duplicates (safety)
        Access.objects.bulk_create([
            Access(doctor=doctor, content=content)
            for doctor in doctors
        ])

        return content

    # ✅ UPDATE CONTENT + RESET ACCESS
    def update(self, instance, validated_data):
        doctors = validated_data.pop('doctors', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if doctors is not None:
            # 🔥 delete old access
            Access.objects.filter(content=instance).delete()

            # 🔥 create new access
            Access.objects.bulk_create([
                Access(doctor=doctor, content=instance)
                for doctor in doctors
            ])

        return instance