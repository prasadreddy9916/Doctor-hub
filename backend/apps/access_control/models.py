from django.db import models
from apps.accounts.models import Doctor
from apps.content.models import Content

class Access(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    content = models.ForeignKey(Content, on_delete=models.CASCADE)
    granted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('doctor', 'content')

    def __str__(self):
        return f"{self.doctor.name} - {self.content.title}"
