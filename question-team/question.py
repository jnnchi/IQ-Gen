import os
from openai import OpenAI

client = OpenAI(api_key='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')


# Define a function to generate a response
def generate_interview_questions():
    prompt = "I want you to act as an interviewer for the entry-level software engineering. \
        Please list down the 10 random yet critical human-resource related quesitons as an interviewer. \
            You can copy some questions of the big-tech companies such as FAANG and IBM on the internet."
    response = client.completions.create(
        model="text-davinci-003",  # Choose the appropriate GPT-3 engine
        prompt=prompt,
        max_tokens=150
    )
    return response.choices[0].text.strip()

# Generate and print interview questions
interview_questions = generate_interview_questions()
print(interview_questions)