from django.urls import path

from . import views

urlpatterns = [
  path('file/', views.FilesView.as_view()),
  path('file/<str:share_id>', views.FilesView.as_view(), name='get_file')
]
