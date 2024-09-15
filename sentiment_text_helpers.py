# this is a list of messages that corraspond to the top emotions that your text contains
# note that these are all written in a way that makes them only good for giving the #1 bit of feedback to a response
# we may want to go for a different system of making these, like small pieces spliced together, but this works for now
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI()

def give_sentiment_full(completed_interview: str):
    """
    Uses GPT-3.5 Turbo to give a short analysis of how the interview went (for end of interview). Takes the str answer.
    """
    only_questions = ''
    for line in completed_interview.split("\n"):
        if len(line) > 2:
            if (line[0] == '') or (line[0] == 'N' and line[2] == 'e'):
                continue
        else:
            only_questions += str(line)

    response = client.chat.completions.create(
    model='gpt-3.5-turbo',
    messages=[
        {"role": "system", "content": f"You are an human resources representative at a tech company, who is reviewing my interview that was just completed, contained in this transcript: {only_questions}. Include a brief description of what I did well, and full description on what I could improve. Format this reponse in paragraph form; it should be at most 6 sentences."},
        {"role": "user", "content": "What did I do poorly or do well during this interview? Give constructive criticism. Do not talk at all about my body language, only focus on my verbal responses. End with concrete tips on how to improve next time."},
    ],
    temperature=0,
    )
    return response.choices[0].message.content

def give_sentiment_question(curr_line: str):
    """
    GPT-3.5 for the sentiment of one (just completed) question. Takes the str full interview, with \n included.
    """
    response = client.chat.completions.create(
    model='gpt-3.5-turbo',
    messages=[
        {"role": "system", "content": f"You are an human resources representative at a tech company. You are in the middle of an interview with an interviewee, who just said: {curr_line}. Give them a concise, two line response about what was good and what can be improved about their response. If the response was really good, explain why it was a good response and encourage them to use it again."},
        {"role": "user", "content": "Give me feedback on how I answered that question from the perspective of an interviewer, including feedback on the tone of my response. Do not start your response with 'Yes' or 'Sure', go directly into the feedback."},
    ],
    temperature=0,
    )
    return response.choices[0].message.content