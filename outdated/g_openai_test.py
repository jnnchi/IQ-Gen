from openai import OpenAI
from pathlib import Path

client = OpenAI(api_key='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')

# full_ans = ''
# prefix = 'The Interviewees last response was:'
# answer = ''
# prev_ans = ''

# response = client.chat.completions.create(
#     model='gpt-3.5-turbo',
#     messages=[
#         {"role": "system", "content": "You are an human resources representative at a tech company."},
#         {"role": "user", "content": "Greet the interviewee, and ask a commonly given question in a job interview"},
#     ],
#     temperature=0,
# )
# print(response.choices[0].message.content)

# answer = input('Respond Here: ')
# prev_ans = answer
# full_ans += answer +', '

# while answer != 'QUIT':

#     response = client.chat.completions.create(
#     model='gpt-3.5-turbo',
#     messages=[
#         {"role": "system", "content": "You are an human resources representative at a tech company."},
#         {"role": "user", "content": f"Give a short one line response to the interviewees response to your last question, which was: {prev_ans} , and then ask a question that is unrelated, and do not ask a question that is similar to any of these: {full_ans}."},
#     ],
#     temperature=0,
#     )
#     print(response.choices[0].message.content)
#     prev_ans = ''
#     answer = input('Respond Here: ')
#     prev_ans = answer
#     full_ans += answer +', '


speech_file_path = Path(__file__).parent / "speech.mp3"
response = client.audio.speech.create(
  model="tts-1",
  voice="alloy",
  input="IQ-GEN is the next great silicon valley startup!"
)

response.stream_to_file(speech_file_path)
print('done!')
