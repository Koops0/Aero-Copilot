from django.apps import AppConfig
from spaceHack2k23.dynamodb import DynamoDB


class ApiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "api"

    DynamoDB.initialize()
