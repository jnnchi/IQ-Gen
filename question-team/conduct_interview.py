import os
from openai import OpenAI

# Set your OpenAI API key
client  = OpenAI(api_key='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')

KEYWORDS = ''
# get list of keywords
with open('keywords.txt','r') as file:
    for word in [line.strip() + ' ' for line in file.readlines()]:
        KEYWORDS += word.lower()


def process_interview_response(model_response, asked):
    sentences = model_response.split('. ')
    questions_only = [sentence for sentence in sentences if sentence.endswith('?')]
    filtered_response = '. '.join(questions_only)
    if filtered_response not in asked:
        asked.add(filtered_response)
        return filtered_response
    return False

# Define a function for the interview simulation
def conduct_interview():
    interview_prompt = "I want you to act as an interviewer. I will be the candidate and you will ask me the interview questions for the entry-level software engineer position. \
        I want you to only reply as the interviewer. Do not write all the conservation at once. I want you to only do the interview with me. \
        Ask me the questions and wait for my answers. Do not write explanations. Ask me the questions one by one like an interviewer does and wait for my answers.\
        My first sentence is 'Hi'."
    interview_response = ""
    
    asked_questions = set()

    while "Thank you for your response" not in interview_response:
        user_response = input("Candidate: ")  # User (interviewee) responds to the question
        found_keywords = [word for word in user_response.lower().split() if word in KEYWORDS]
        if found_keywords:
            # Constructing a question that includes all found keywords
            keywords_as_str = " and ".join([f"{word}" for word in found_keywords])
            interview_prompt += f"\nInterviewer: Can you elaborate on {keywords_as_str}? Could you describe specific projects or tasks where you utilized these skills?" + user_response
        else:
            # If no keywords are detected, continue with a general question
            interview_prompt += "\nInterviewer: " + user_response

        interview_response = False
        while not interview_response:
            interview_prompt += "\nInterviewer: " + user_response
            interview_response = client.completions.create(
                model="text-davinci-003",
                prompt=interview_prompt,
                max_tokens=50
            ).choices[0].text.strip()
            interview_response = process_interview_response(interview_response, asked_questions) or False # False if no questions or if question was already asked
        print(interview_response)

# Start the interview
print("Welcome to the software engineering interview. Please respond to the questions as the candidate.")
conduct_interview()