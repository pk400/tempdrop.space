from django.db import models


class UploadFileForm(models.Model):
  file = models.FileField(upload_to='./uploads')
