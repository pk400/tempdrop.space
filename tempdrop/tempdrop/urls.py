from django.contrib import admin
from django.urls import include, path
from django.urls import re_path

from server.views import index

urlpatterns = [
  path('api/', include('server.urls'), name='api'),
  path('admin/', admin.site.urls),
  # Ensure the above paths are resolved first before handling frontend urls.
  re_path(r'^$', index, name='index'),
  re_path(r'^(?:.*)/?$', index),
]
