import json

from aws_lambda_powertools.event_handler import APIGatewayRestResolver, Response, CORSConfig
from aws_lambda_powertools.event_handler.middlewares import NextMiddleware
from aws_lambda_powertools.utilities.typing import LambdaContext
import boto3

dynamodb = boto3.resource("dynamodb", region_name="us-east-1", )
table = dynamodb.Table('nasa_hackathon')

cors_config = CORSConfig(allow_origin="*", max_age=300, allow_headers=['GET'])
app = APIGatewayRestResolver(cors_config)


@app.get("/document")
def get_documents():
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
    return {"documents": final_response}


@app.get("/document/<document_id>")
def get_document_by_id(document_id: str):
    data = table.query(
        KeyConditionExpression="partition_key = :pk and sort_id = :sk",
        ExpressionAttributeValues={
            ":pk": 'document',
            ":sk": document_id,
        },
        ProjectionExpression='item_data'
    )['Items']
    if len(data) == 0:
        return {"error": "No document ID found"}
    return {"data": json.loads(data[0]['item_data'])}


@app.get("/definitions/<document_id>")
def get_definitions_by_id(document_id: str):
    data = table.query(
        KeyConditionExpression="partition_key = :pk and sort_id = :sk",
        ExpressionAttributeValues={
            ":pk": 'definition',
            ":sk": document_id,
        },
        ProjectionExpression='item_data'
    )['Items']
    if len(data) == 0:
        return {"error": "No definitions found for document ID"}
    return {"definitions": json.loads(data[0]['item_data'])}


@app.get("/llm")
def get_llm():
    lambda_client = boto3.client('lambda')

    test_str = """Human: 

Human:
You are now a technical document reviewer working at NASA Space Agency.
Your job is to look for technical terms that lack context and concepts mentioned that have an unclear definition
The objective is to identify any language that could cause misinterpretation during inspections or assessments.

Ambiguous terms could be single word, a compound word or technical specifications that are broadly defined and could be interpreted in multiple ways without clear definition depending on the context
Example of an ambiguous term is "vehicle" when it is used in a paragraph that does not refer to a particular type of vehicle.
Ambiguous concepts would be ideas or properties mentioned in the text that require further explanation to have a well-defined, unambiguous meaning within a technical context
Example of an ambiguous concept is "glass damage"  when it is used in a paragraph without defining what type of damage to the glass would be unacceptable.

A paragraph from the technical document that you need to review will be inside <paragraph></paragraph> XML tags
The general context of the document is always the aerospace industry.

When you reply, first identify all the available technical terms and concepts from the paragraph and write them down inside <thinking></thinking> XML tags.
This is a space for you to write down relevant content and will not be shown to the user.
Once you are done identify all the technical terms and concepts, answer the question.

Use these steps to evaluate each of the technical terms and concepts for ambiguity:
1. Determine the context of the entire paragraph.
2. Determine the context of the sentence in which the technical term or concept is used.
3. Determine if the technical term or concept is well-defined in either the sentence context, the paragraph context or the general document context.

Put your answer to the user inside <answer></answer> XML tags.
The format of the answer should be a list of JSONs similar to the one inside the <format></format> XML tags

<format>
[
{
"keyword":"The value of this key should be the technical term or concept",
"is_ambiguous": "The value of this key should be true if the technical term or concept is ambiguous or potentially ambiguous",
"reason": "The value of this key should contain the reason why technical term or concept is ambiguous or potentially ambiguous"
}
]
</format>

When I write BEGIN DIALOGUE you will enter this role and evaluate the paragraph for ambiguous terms or phrases or concepts.


BEGIN DIALOGUE
<paragraph>
    Glass Pane-to-Seal (or Cushion) Interface
    a. The window seal shall meet its performance requirements within the temperature extremes of the seal-to-windowpane interface for the duration of the design life of the window, precluding degradation from the environment or aging.
    b. The window design shall prohibit the phase change (glassy transition) of the seal (or cushion) material in contact with the glass at the lower temperature extremes of the seal/glass pane interface.
    In this context,the seal is any material in contact with the glass in the assembly.
    The material does not necessarily have to function as a seal for this requirement to be applicable.
</paragraph>

Assistant: Can I think step-by-step?

Human: Yes, please do.

Assistant:"""

    llm_data = {
        "prompt": test_str,
        "temperature": 0.3,
        "top_p": 0.9,
        'stop_sequences': ['\n\nHuman:'],
        'top_k': 250,
        'anthropic_version': 'bedrock-2023-05-31',
        'max_tokens_to_sample': 2048,
    }

    response = lambda_client.invoke(
        FunctionName='arn:aws:lambda:us-east-1:436617760852:function:nasa-ml-invoker',
        InvocationType='Event',
        Payload=json.dumps(llm_data)
    )
    return {"response": "true"}


def lambda_handler(event: dict, context: LambdaContext) -> dict:
    return app.resolve(event, context)
