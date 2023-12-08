# SOURCE: https://www.youtube.com/watch?v=5_tkPG-po1g

from openai import OpenAI

client = OpenAI(api_key='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')
import gradio as gr

def openai_chat(elevator_pitch):
    # https://platform.openai.com/docs/guides/text-generation/chat-completions-api LOL why didn't i read documentation
    #elevator_pitch = """Hey, I’m Jamie Brown. I’ve just received my double bachelor’s degree in computer science and business administration. I’ve held three internships where I’ve had to create reports, develop new programs, and pitch projects to the wider team. My current focus is getting a job in project management."""
    input_prompt = f"""{elevator_pitch}
        Based on the above interview response, generate five insightful interview questions. For example:
        1. "Can you describe a project from your internships where you faced a significant challenge and how you addressed it?"
        2. "How do you envision applying your computer science skills in a project management role?"
        3. "What strategies have you found effective for communicating technical concepts to non-technical team members during your pitches?"
        These questions aim to probe deeper into the candidate's practical experience, problem-solving skills, and ability to bridge technical and business domains."""

    completion = client.completions.create(model='davinci', prompt=input_prompt, max_tokens=150, temperature=0.7)
    
    # extract the text section of completion object
    message = completion.choices[0].text
    print(f'{message=}')
    return message

gr.Interface(fn=openai_chat, inputs=['text'], outputs=['text']).launch(debug=True)

# SAMPLE INPUTS FOR TESTING:
"""Hey, I’m Jamie Brown. I’ve just received my double bachelor’s degree in computer science and business administration. I’ve held three internships where I’ve had to create reports, develop new programs, and pitch projects to the wider team. My current focus is getting a job in project management."""
