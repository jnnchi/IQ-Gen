# gabe's implementation of GPT
from openai import OpenAI

client = OpenAI()
import os

client = OpenAI(api_key='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')

# def gpt_test(input_text):

#     input_profession = input("User: ")
#     messages = [
#     {"role": "assistant", "content": "You are a russian interviewer interviewing me for the job of " + input_profession},
#   ]


def chatbot():
    # Create a list to store all the messages for context
    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
    ]

    # Keep repeating the following
    while True:
        # Prompt user for input
        message = input("User: ")

        # Exit program if user inputs "quit"
        if message.lower() == "quit":
            break

        # Add each new message to the list
        messages.append({"role": "user", "content": message})

        # Request gpt-3.5-turbo for chat completion
        response = client.chat.completions.create(model="gpt-3.5-turbo",
        messages=messages)

        # Print the response and add it to the messages list
        chat_message = response['choices'][0]['message']['content']
        print(f"Bot: {chat_message}")
        messages.append({"role": "assistant", "content": chat_message})


if __name__ == "__main__":
    print("Start chatting with the bot (type 'quit' to stop)!")
    chatbot()
