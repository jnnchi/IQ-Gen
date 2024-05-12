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
        {"role": "system", "content": f"You are an human resources representative at a tech company, who is reviewing my interview that was just completed, contained in this transcript: {only_questions}. focus on one thing the interviewee did well and one thing they could improve, but format it like a response to the user."},
        {"role": "user", "content": "How did my interview go! Please tell me the things I did well in my interview, and the things that I could improve upon!"},
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
        {"role": "system", "content": f"You are an human resources representative at a tech company. You are in the middle of an interview with an interviewee, who just said: {curr_line}. Give them a short, one line response, telling them weather their answer was good or bad, and how they could improve next time."},
        {"role": "user", "content": "Can you give me a little bit of feedback on how I answered that question?"},
    ],
    temperature=0,
    )
    return response.choices[0].message.content