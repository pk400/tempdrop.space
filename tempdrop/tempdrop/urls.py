from django.contrib import admin
from django.urls import include, path

# from server.views import index

urlpatterns = [
  path('api/', include('server.urls'), name='api'),
  path('admin/', admin.site.urls),
  # # Ensure the above paths are resolved first before handling frontend urls.
  path('', include('client.urls'), name='client')
]
