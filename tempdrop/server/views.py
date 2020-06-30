import os
import uuid

from django.http import HttpResponse, JsonResponse

from server.library.s3_data_store import S3DataStore
from server.models import FileInfo


data_store = S3DataStore(os.environ['ACCESS_KEY'], os.environ['SECRET_KEY'],
  'tempdrop-space')


def add_file(request):
  if request.method == 'POST':
    share_id = uuid.uuid4().hex
    uploaded_file = request.FILES['uploaded_file']
    data_store.store_file(uploaded_file, share_id)
    file_info = FileInfo(share_id=share_id, file_name=uploaded_file.name)
    file_info.save()
    return JsonResponse({'share_id': share_id})
  return HttpResponse(status=404)


def get_file(request, share_id=-1):
  if request.method == 'GET':
    file_info = FileInfo.objects.get(share_id=share_id)
    file = data_store.load_file(share_id)
    response = HttpResponse(file.read(),
      content_type='application/force-download')
    response['Content-Disposition'] = \
      f'attachment; filename="{file_info.file_name}"'
    return response
  return HttpResponse(status=404)
