import boto3
from spaceHack2k23.settings import *


class DynamoDB:
    @staticmethod
    def initialize():
        session = boto3.Session(
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        )
        dynamodb = session.resource(
            "dynamodb",
            region_name="us-east-1",
        )
        DynamoDB.table = dynamodb.Table(AWS_STORAGE_TABLE_NAME)
        print("DynamoDB initialized")

    @staticmethod
    def queryDataFromFile(file_name, user_id):
        return DynamoDB.table.query(
            KeyConditionExpression="partition_key = :pk and sort_id = :sk",
            ExpressionAttributeValues={
                ":pk": user_id,
                ":sk": file_name + "-full_text",
            },
        )
