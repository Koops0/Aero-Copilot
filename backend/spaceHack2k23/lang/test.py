from langchain.document_loaders import DirectoryLoader
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from langchain.vectorstores import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings

from langchain.prompts import PromptTemplate
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
from langchain.output_parsers import RegexParser
import openai

loader = DirectoryLoader(f'docs', glob="./*.pdf", loader_cls=PyPDFLoader)
documents = loader.load()
chunk_size_value = 1000
chunk_overlap=100
text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size_value, chunk_overlap=chunk_overlap,length_function=len)
texts = text_splitter.split_documents(documents)

docembeddings = FAISS.from_documents(texts, OpenAIEmbeddings())
docembeddings.save_local("llm_faiss_index")
docembeddings = FAISS.load_local("llm_faiss_index",OpenAIEmbeddings())


prompt_template = """Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.

This should be in the following format:

Question: [question here]
Helpful Answer: [answer here]
Score: [score between 0 and 100]

Begin!

Context:
---------
{context}
---------
Question: {question}
Helpful Answer:"""
output_parser = RegexParser(
    regex=r"(.*?)\nScore: (.*)",
    output_keys=["answer", "score"],
)
PROMPT = PromptTemplate(
    template=prompt_template,
    input_variables=["context", "question"],
    output_parser=output_parser
)
chain = load_qa_chain(OpenAI(temperature=0), chain_type="map_rerank", return_intermediate_steps=True, prompt=PROMPT)


def getanswer(query):
    relevant_chunks = docembeddings.similarity_search_with_score(query,k=2)
    chunk_docs=[]
    for chunk in relevant_chunks:
        chunk_docs.append(chunk[0])
    results = chain({"input_documents": chunk_docs, "question": query})
    text_reference=""
    for i in range(len(results["input_documents"])):
        text_reference+=results["input_documents"][i].page_content
    output={"Answer":results["output_text"],"Reference":text_reference}
    return output


def getanswerOpenAI(query, context):
    # Define the prompt including context and question
    prompt = f"Context:\n{context}\n\nQuestion: {query}"

    # Call the OpenAI API
    response = openai.Completion.create(
        engine="davinci",  # Choose the appropriate engine (e.g., "davinci" for GPT-3, "text-davinci-003" for GPT-4)
        prompt=prompt,
        max_tokens=50,  # Adjust as needed
        stop=None,  # You can specify stop words if necessary
    )

    # Extract and return the answer from the response
    answer = response.choices[0].text.strip()
    return {"Answer": answer}
