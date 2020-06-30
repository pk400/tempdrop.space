from django.shortcuts import render

from client.forms import UploadFileForm


def index(request):
  return render(request, 'client/index.jinja', {'form': UploadFileForm()})


def share(request, share_id=-1):
  return render(request, 'client/share.jinja', {'share_id': share_id})
