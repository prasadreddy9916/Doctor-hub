from django.contrib import admin
from .models import Access

@admin.register(Access)
class AccessAdmin(admin.ModelAdmin):
    list_display = ['doctor', 'content', 'granted_at']
    list_filter = ['granted_at']
    search_fields = ['doctor__name', 'content__title']
    readonly_fields = ['granted_at']
