import json
import boto3

bedrock_runtime = boto3.client(
 service_name='bedrock-runtime',
 region_name='us-east-1'
)


def lambda_handler(event, context):
    body = json.dumps(event)

    modelId = 'anthropic.claude-v2'
    accept = 'application/json'
    contentType = 'application/json'

    response = bedrock_runtime.invoke_model(body=body, modelId=modelId, accept=accept, contentType=contentType)

    response_body = json.loads(response.get('body').read())
    # text
    print(response_body.get('completion'))
