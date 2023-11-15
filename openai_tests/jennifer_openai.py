# SOURCE: https://www.youtube.com/watch?v=5_tkPG-po1g

from openai import OpenAI

client = OpenAI(api_key='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')
import gradio as gr

def openai_chat(input_prompt):

    # teaches openai api what u want to achieve
    template = """
        Sentence: Hello, my name is John Jones. I’m currently a software engineer at 
        Google and have a wide breadth of experience researching and designing 
        software programs and innovative solutions that solve real-world problems. 
        I’ve developed new architecture for network equipment systems, from 
        routers to voice-enabled network applications. I’ve been a huge fan of 
        your company for years, and saw that you had an opening for a principal 
        software engineer manager. I would love to be considered for this position.
        Question: Hello John Jones! Can you describe a particularly challenging software program you researched and designed? 
        Question: What innovative solutions did you implement to overcome those challenges?
        Sentence: Hi, I’m Sally Smith. As a civil engineering manager at General 
        Motors for the past two years, I’ve led multiple cross-functional teams in 
        conceiving, designing, and maintaining large infrastructure projects in the 
        public and private sectors. Notably, utilizing my geotechnical engineering 
        experience, I was recently able to move forward on developing a large chip 
        manufacturing facility for a major company.
        Question: Hello Sally Smith! Can you walk us through the most challenging geotechnical engineering problem you faced in your infrastructure projects and how you resolved it? 
        Question: As a manager leading cross-functional teams, how do you ensure effective communication and collaboration among team members with diverse expertise?
        """
    
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



# extra questions
"""
Can you describe a particularly challenging software program you 
researched and designed? What innovative solutions did you implement to 
overcome those challenges? Given your experience with network equipment systems, 
how do you approach designing architecture for scalability and reliability?
What strategies have you employed in past projects to ensure the security 
and efficiency of voice-enabled network applications? As a prospective principal 
software engineer manager, how do you envision balancing hands-on technical work 
with management responsibilities? Describe a time when you had to solve a real-world 
problem through software. What was the problem, and how did your solution impact 
the end-users? In your role at Google, how did you collaborate with other 
teams or departments? Can you discuss a project where cross-functional collaboration 
was key to success?"""