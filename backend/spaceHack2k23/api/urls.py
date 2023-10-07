from django.urls import path
from .views import *


urlpatterns = [
    path("hello/", HelloWorldView.as_view(), name="hello-world"),
    path("data/", DataView.as_view(), name="data"),
    path("process/", ProcessSubsectionView.as_view(), name="process"),
]
