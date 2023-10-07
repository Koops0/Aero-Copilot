import os
import openai

# Load API key
openai.api_key = 'INSERT_API_KEY_HERE' ##This is where you put the OpenAI API Key, removed for security purposes

key = 'installation of the window' ##Anything from the text that you want to check for ambiguity
text = open("question.txt", "r")
text = text.read()
response = openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=[
    {
      "role": "system",
      "content": f"You are now a technical document reviewer working at NASA Space Agency.\nYou are in charge \
        of reviewing technical documents related to materials that are used in the harsh environment of space.\nThis requires \
        materials to be tested rigorously with no ambiguity in the requirements of the material during inspections or \
        assessments.\nYour job is to ensure that paragraphs should not have noun chunks that lack context, phrases that are \
        too broad or vague, and concepts mentioned that have an unclear definition\n\nThe primary goal is to clarify any \
        language that could cause misinterpretation during inspections or assessments.\nThe secondary goal is to request \
        examples for terms, phrases or concepts from a human if a relevant example is not found in the text.\n\nAmbiguous \
        terms could be single word, a compound word or technical specifications that could be interpreted in multiple ways \
        without clear definition depending on the context, like just saying \"vehicle\" without specifying if it's referring \
        to a particular type of vehicle.\nAmbiguous concepts would be ideas or properties mentioned in the text that require \
        further explanation to have a well-defined, unambiguous meaning within a technical context, like just saying \"glass \
        damage\" without defining what type of damage to the glass would be unacceptable.\n\nWith the given information, \
        determine if the term {key} is ambiguous in the below text in one sentence\n\n{text}"
    },
    {
      "role": "assistant",
      "content": ""
    },
    {
      "role": "assistant",
      "content": "The term \"installation of the window\" is not ambiguous in this context. It refers to the process of putting the window into the vehicle/element."
    }
  ],
  temperature=0.4,
  max_tokens=256,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0
)