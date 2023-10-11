# Aero CoPilot
2023 NASA International Space Apps Challenge

<img src="screenshots/logo.png" alt="System Architecture" width="100"/>

## Final Output
<img src="screenshots/output.png" alt="System Architecture" width="600"/>

## Introduction
Aero Copilot is a state-of-the-art document processing system backed by AI that streamlines and corrects technical documents so that NASA technicians can save time and money, so that they can focus on what really matters.

The process of running this application is simple. After they log in, the user can upload a PDF that will be parsed by the backend and broken down into the sections and the sub-sections. We then store the definitions that are already defined in the document for the future where it can be used to reduce falsely flagged texts. Next, we feed each section into the LLM with a custom prompt that allows the LLM to analyze the text like a human would and flag the ambiguous texts.

On a high level, we have used NextJS for the frontend, Python Flask for the API, AWS as the cloud provider and the Claude v2 model via AWS Bedrock as our trained LLM.

To see the technical document that the team has produced, please click [here](https://docs.google.com/document/d/1aGVDmX8dsZxUEb_ebyPDwBwVycFrlNL57G3RcUGwQMw/edit?usp=sharing).


## Table of Contents

- [System Overview](#system-overview)
- [Getting Started](#getting-started)
- [User Guide](#user-guide)
- [System Functionality](#system-functionality)
- [Contributing](#contributing)
- [Special Thanks](#special-thanks)

## System Overview
Aero Copilot’s system architecture is built using a microservices architecture using Amazon Web Services (AWS), LangChain and Claude, via Amazon Bedrock. The system architecture is as follows:


<img src="screenshots/system.png" alt="System Architecture" width="600"/>

From a Next.js Web Application, an HTTP request is thrown to AWS Lambda, where technician sign-up and verification is provided by AWS Cognito and the profile is then stored using DynamoDB. Once a technician uploads a PDF in the website, it gets transferred to an AWS S3 bucket, parses the PFD document, then it goes through LangChain and Amazon Bedrock, for each section. The custom prompt scrapes all technical keywords, phrases and concepts and checks if a term is ambiguous and should be clarified, by comparing with another DynamoDB database with definitions.. Finally, it will show the text with any ambiguous terms flagged, with additional details being provided to the technician at the bottom half of the website. This is what the expected output should be like:

## Getting Started

To get started with Aero Copilot, follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies as outlined in the project documentation. For this project, you'll need an AWS account, Python and Node.js.
3. Set up your AWS Credentials.
4. Install the packages that are going to be used in the project.
5. Configure AWS services and environmental variables.

You can now create an account and import a PDF to Aero Copilot.

## User Guide

- User Registration and Login: Users can securely register and log in using AWS Cognito.
- Uploading PDFs: Upload PDF documents via the user-friendly web interface.
- Document Processing: AI-powered processing extracts text and generates suggestions.
- Reviewing Suggestions: Users review and accept suggestions for document improvements.
- Approval Workflow: An automated workflow, possible provided by JIRA, tracks and manages suggestion approval.



## System Functionality

- PDF Ingestion: PDF documents are ingested into AWS S3 bucket and processed using a custom script
- AI Document Analysis: LLM analyzes technical PDFs, extracting content and identifying areas for improvement.
- Suggestion Generation: Custom algorithms analyze parsed results to generate document improvement suggestions.
- Workflow Automation: Possibly via JIRA


## Contributing

Contributions to Aero CoPilot are welcome and appreciated. If you would like to contribute, please follow the guidelines outlined in the CONTRIBUTING.md file.

## License

Aero CoPilot is licensed under the MIT License. Please review the license file for more information about the permissions and limitations it provides.

## Special Thanks

* [NASA](https://www.nasa.gov/), for creating this hackathon.

Every other citation is in the report and the submission itself on the Space Apps Website.
