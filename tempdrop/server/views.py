import uuid

from django.http import FileResponse, JsonResponse
from django.views import View

from server.models import FileInfo
from tempdrop.storages.s3boto3.media_storage import MediaStorage


class FilesView(View):
  media_storage = MediaStorage()

  def get(self, request, share_id=-1):
    file_info = FileInfo.objects.get(share_id=share_id)
    return FileResponse(self.media_storage.open(share_id, 'rb'),
      content_type=file_info.content_type, filename=file_info.file_name,
      as_attachment=True)

  def post(self, request):
    share_id = uuid.uuid4().hex
    uploaded_file = request.FILES.get('uploaded_file', '')
    file_info = FileInfo(share_id=share_id, file_name=uploaded_file.name,
      content_type=uploaded_file.content_type)
    file_info.save()
    self.media_storage.save(share_id, uploaded_file)
    return JsonResponse({'share_id': share_id})
