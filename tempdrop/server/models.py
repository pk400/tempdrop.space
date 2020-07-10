from django.db import models
from django.utils import timezone


class FileInfo(models.Model):
  share_id = models.CharField(max_length=32, blank=False)
  file_name = models.TextField()
  content_type = models.TextField(default='')
  creation_timestamp = models.DateTimeField(default=timezone.now,
    blank=False)
