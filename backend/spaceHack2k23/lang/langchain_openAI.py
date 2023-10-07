import json
from langchain.llms import OpenAI
from langchain_coher import *
from spaceHack2k23.settings import *

import os

os.environ["OPENAI_API_KEY"] = OPEN_AI_KEY

llm = OpenAI(model_name="text-davinci-003")

paragraph = """'The installation of the window into the vehicle/element shall not cause:
a. Damage to the glass over the service life of the vehicle.
b. Deterioration of the sealing capabilities over the service life of the vehicle."""

ambiguous = []
not_ambiguous = []


json_string = getTechnicalInformation(paragraph=paragraph)


def checkAmbiguity():
    json_object = json.loads(json_string)
    technical_keywords = set(json_object["technical keywords"])
    technical_phrases = set(json_object["technical phrases"])
    technical_concepts = set(json_object["technical concepts"])

    for word in technical_keywords:
        our_query = f"""Prompt: You are now a technical document reviewer working at NASA Space Agency.
        You are in charge of reviewing technical documents related to materials that are used in the harsh environment of space.
        This requires materials to be tested rigorously with no ambiguity in the requirements of the material during inspections or assessments.
        Your job is to ensure that paragraphs should not have noun chunks that lack context, phrases that are too broad or vague, and concepts mentioned that have an unclear definition

        The primary goal is to clarify any language that could cause misinterpretation during inspections or assessments.
        The secondary goal is to request examples for terms, phrases or concepts from a human if a relevant example is not found in the text.

        Ambiguous terms could be single word, a compound word or technical specifications that could be interpreted in multiple ways without clear definition depending on the context, like just saying "vehicle" without specifying if it's referring to a particular type of vehicle.
        Ambiguous concepts would be ideas or properties mentioned in the text that require further explanation to have a well-defined, unambiguous meaning within a technical context, like just saying "glass damage" without defining what type of damage to the glass would be unacceptable.

        With the given information, determine if the term "{word}" is ambiguous in the below text in one sentence

        {paragraph}"""
        completion = llm(our_query)
        words = completion.split()

        # Check if the first word is "yes" or "no" (case insensitive)
        if words[0].lower() == "yes":
            ambiguous.append(word)
            print("The first word is 'yes'")
        elif words[0].lower() == "no":
            not_ambiguous.append(word)
            print("The first word is 'no'")


checkAmbiguity()

# completion = llm(our_query)


# print(completion)
