import boto3

def test_stuff():
    session = boto3.Session(
        aws_access_key_id='AKIAWLKDSKBKNCJB5ZPN',
        aws_secret_access_key='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',
    )
    dynamodb = session.resource(
        "dynamodb",
        region_name="us-east-1",
    )
    table = dynamodb.Table('nasa_hackathon')

    documents = table.query(
        KeyConditionExpression="partition_key = :pk",
        ExpressionAttributeValues={
            ":pk": 'document'
        },
        ProjectionExpression='sort_id'
    )['Items']
    final_response = []
    for item in documents:
        final_response.append(item['sort_id'])
    print( {"documents": final_response})