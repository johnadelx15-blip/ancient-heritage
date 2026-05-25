from django.urls import path
from . import views

urlpatterns = [
    path('artifacts/', views.artifact_api, name='artifact_api'),
]
