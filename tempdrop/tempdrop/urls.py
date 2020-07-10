from django.contrib import admin
from django.urls import include, path
from django.urls import re_path
from django.conf import settings
from django.conf.urls.static import static

from server.views import index

urlpatterns = [
  path('api/', include('server.urls'), name='api'),
  path('admin/', admin.site.urls),
  # Ensure the above paths are resolved first before handling frontend urls.
  re_path(r'^$', index, name='index'),
  re_path(r'^(?:.*)/?$', index),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
