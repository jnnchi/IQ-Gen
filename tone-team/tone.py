import requests
from emotion_messages import system_messages

API_URL = "https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions"
headers = {"Authorization": "Bearer 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"}

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()
	
#this user response is what we are passing to GPT as well--from Whisper.
user_response = input('Please type your response to the question:')

#this is where the output emotion is generated
output = query({
	"inputs": user_response,
})

print(system_messages[output[0][0]['label']])