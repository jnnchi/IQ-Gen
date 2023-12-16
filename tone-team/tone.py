import requests
import sentiment_text_helpers

API_URL = "https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions"
headers = {"Authorization": "Bearer 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"}


def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()


# initialize the response for the while loop
user_response = ''

while 'Thanks!' not in user_response:

    # update response with input. NOTE: This user response is what we are passing to GPT as well--from Whisper.
    user_response = input('Please type your response to the question:')

    # this is where the output emotion is generated
    output = query({
        "inputs": user_response.lower(),
    })

    # this next variable is where all the possible feedback functions are added into
    feedback = (
        sentiment_text_helpers.system_messages[output[0][0]['label']]
        + sentiment_text_helpers.flag_overused_words(user_response.lower())
        + sentiment_text_helpers.flag_disallowed_words(user_response.lower())
        + sentiment_text_helpers.flag_um(user_response.lower())
    )

    print(feedback)

print('Great Job! Feel free to come back soon my friend!')
