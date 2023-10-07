from django.http import JsonResponse
from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework import status

from spaceHack2k23.dynamodb import DynamoDB


class HelloWorldView(APIView):
    def get(self, request):
        message = "Hello, World!"
        return JsonResponse({"message": message}, status=status.HTTP_200_OK)


class DataView(APIView):
    def post(self, request):
        # read "file_name" from request.data
        file_name = request.data["file_name"]
        user_id = request.data["user_id"]

        response = DynamoDB.queryDataFromFile(file_name, user_id)
        return JsonResponse(response, status=status.HTTP_200_OK)


class ProcessSubsectionView(APIView):
    def post(self, request):
        file_name = request.data["file_name"]
        text = request.data["text"]
        response = self.get_response_from_model(file_name, text)
        return JsonResponse({}, status=status.HTTP_200_OK)

    def get_response_from_model(self, file_name, text, *args, **kwargs):
        print(file_name, text)
        # TODO: call model here
        pass
