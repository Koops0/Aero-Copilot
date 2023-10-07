from django.urls import path
from .views import *


urlpatterns = [
    path("hello/", HelloWorldView.as_view(), name="hello-world"),
]
