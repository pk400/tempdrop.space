from django.urls import path

from . import views

urlpatterns = [
  path('file/', views.add_file, name='add_file'),
  path('file/<str:share_id>', views.get_file, name='get_file')
]
