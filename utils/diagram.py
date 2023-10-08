from diagrams import Diagram, Cluster, Edge
from diagrams.aws.compute import Lambda, ECS
from diagrams.aws.integration import StepFunctions
from diagrams.aws.security import Cognito
from diagrams.aws.database import Dynamodb
from diagrams.aws.storage import S3
from diagrams.programming.framework import React
from diagrams.c4 import System

with Diagram(
    "",
    filename="../screenshots/system",
    show=False,
    graph_attr={
        # "bgcolor": "transparent",
        "pad": "0.5",
        "nodesep": "0.5",
        "ranksep": "0.5",
        "splines": "ortho",
    },
):
    with Cluster("Web Application"):
        web_app = React("Web Application (Next.js)")

    with Cluster("AWS Services"):
        aws_lambda = Lambda("AWS Lambda")
        cognito = Cognito("Cognito")
        s3 = S3("S3")
        dynamodb = Dynamodb("DynamoDB")

        web_app - Edge(label="HTTP Request", fontname="bold") >> aws_lambda
        (
            web_app
            - Edge(label="PDF Upload", color="blue", style="bold", fontname="bold")
            >> s3
        )
        aws_lambda - Edge(label="User Login", fontname="bold") >> cognito
        aws_lambda - Edge(label="Data Retrieval", fontname="bold") >> dynamodb

    with Cluster("AI Services"):
        langchain = ECS("Langchain")
        openai = ECS("OpenAI")

        s3 - Edge(label="Data Processing", fontname="bold") >> langchain
        (
            langchain
            >> Edge(label="LLM Execution", style="bold", fontname="bold")
            >> openai
        )
        langchain >> Edge(label="Data Storage", fontname="bold") >> dynamodb
