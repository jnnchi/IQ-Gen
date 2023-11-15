# SOURCE: https://www.youtube.com/watch?v=5_tkPG-po1g

from openai import OpenAI

client = OpenAI(api_key='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')
import gradio as gr

def openai_chat(input_prompt):

    # the template teaches openai api what u want to achieve
    # i stored it in another file for more readability
    with open('jennifer_training.txt', 'r') as file:
        template = file.read()

    # when user enters a new sentence, they obviously won't type "Sentence: " first, so we do that
    input_prompt = 'Sentence: ' + input_prompt
    # pass the input prompt AND the template into the completions create function
    prompt = template + input_prompt
    completion = client.completions.create(model='davinci', prompt=str(prompt), max_tokens=64, temperature=0.7)
    
    # extract the text section of completion object
    message = completion.choices[0].text
    print(f'{message=}')
    
    output_list = message.split('\n')
    print(f'{output_list=}')
    out_index = []
    for idx, sentence in enumerate(output_list):
        if 'Question' in sentence:
            out_index.append(idx)
    print(f'{out_index=}')
    if out_index:
        return output_list[min(out_index):max(out_index) + 1]

gr.Interface(fn=openai_chat, inputs=['text'], outputs=['text']).launch(debug=True)

# SAMPLE INPUTS FOR TESTING:
"""Hey, I’m Jamie Brown. I’ve just received my double bachelor’s degree in computer science and business administration. I’ve held three internships where I’ve had to create reports, develop new programs, and pitch projects to the wider team. My current focus is getting a job in project management."""
