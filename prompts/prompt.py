import cohere
co = cohere.Client('MP8mdQwd6kphSnGGlODq58uWJIggO71u6myCGhKF') # This is your trial API key

#Generate Cohere Response to Prompt
def generate_text(prompt, temp=0.5):
  response = co.generate(
    model='command',
    prompt=prompt,
    max_tokens=1000,
    temperature=temp)
  return response.generations[0].text

#Text to be used as prompt

prompt = f"""You are now a technical document reviewer working at NASA Space Agency.\
You are in charge of reviewing technical documents related to materials that are used in the harsh environment of space.\ 
"""

response = generate_text(prompt, temp=0.5)
print(response)