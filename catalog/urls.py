from django.urls import path
from . import views

urlpatterns = [
    path('api/artifacts/', views.artifact_api, name='artifact_api'),
]
