from django.http import JsonResponse
from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework import status


class HelloWorldView(APIView):
    def get(self, request):
        message = "Hello, World!"
        return JsonResponse({"message": message}, status=status.HTTP_200_OK)
