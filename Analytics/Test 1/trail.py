import os
from constants import openai_key
from langchain.llms.openai import OpenAI  
from langchain import PromptTemplate
from langchain.chains import LLMChain
from langchain.chains import SequentialChain
from langchain.memory import ConversationBufferMemory
import streamlit as st

os.environ["OPENAI_API_KEY"] = openai_key

st.title('Langchain Demo With OPENAI API')
input_text = st.text_input("Search the topic you want")

first_input_prompt = PromptTemplate (
    input_variables=['name'],
    template = "Tell me about {name}"
)

llm = OpenAI(temperature=0.8) 
chain=LLMChain(llm=llm, prompt=first_input_prompt,verbose=True)

if input_text:
    st.write(chain.run(input_text))
