import json
import boto3
from langchain_coher import *

session = boto3.Session(
    aws_access_key_id="",
    aws_secret_access_key="",
)
dynamodb = session.resource(
    "dynamodb",
    region_name="us-east-1",
)
table = dynamodb.Table("nasa_hackathon")
print(table.creation_date_time)


# response = table.scan()
response = table.query(
    KeyConditionExpression="partition_key = :pk and sort_id = :sk",
    ExpressionAttributeValues={
        ":pk": "user_id",
        ":sk": "file_name-definitions",
    },
)



json='''
{
    "technical keywords": [
        "Glass", "other brittle materials", "scatter", "material properties", "failure",
        "sudden failure", "safety factor" "", "standard", "well-characterized materials",
        "annealed glass", "ultimate factor of safety", "section 4.3.9", "design"
    ],
    "technical phrases": [
        "designed to a minimum ultimate factor of safety of 3.0 at the beginning of life",
        "designed to a minimum ultimate factor of safety of 1.4 at the end of life"
    ],
    "technical concepts": [
        "factor of safety"
    ]
}'''

def checkDefinitionExists(json_string):
    # Parse the JSON string to a Python JSON object
    json_object = json.loads(json_string)
    technical_keywords = set(json_object["technical keywords"])
    technical_phrases = set(json_object["technical phrases"])
    technical_concepts = set(json_object["technical concepts"])

    for item in response["Items"]:
        item_data = item["data"]
        item_dict = json.loads(item_data)
        
        for key, value in item_dict.items():
            if key in technical_keywords or key in technical_phrases or key in technical_concepts:
                return value

    return None



