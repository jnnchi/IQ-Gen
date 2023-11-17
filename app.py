from flask import Flask, request, jsonify, render_template
from openai import OpenAI


app = Flask(__name__)
client = OpenAI(api_key='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')


def openai_chat(input_prompt):
    with open('/Users/jennifer/VSCodeProjects/LLM-Interviewer/openai_practice/jennifer_template.txt', 'r') as file:
        template = file.read()

    # when user enters a new sentence, they obviously won't type "Sentence: " first, so we do that
    input_prompt = 'Sentence: ' + input_prompt
    # pass the input prompt AND the template into the completions create function
    prompt = template + input_prompt
    # more tokens means longer responses, higher temperature means more creative responses
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

@app.route('/analyze_transcript', methods=['POST'])
def analyze_transcript():
    data = request.json
    transcript = data['transcript']
    
    analysis_result = openai_chat(transcript)

    print(analysis_result)
    return jsonify({'message': 'Transcript received', 'analysis': analysis_result})

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)