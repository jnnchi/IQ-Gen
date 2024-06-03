# IQ-Gen's LLM Interviewer
IQ-Gen is a project created as part of the UTMIST LLM Acceleration program, and aims to help young professionals prepare for behavioral interviews by utilizing a large language model to generate personalized interview questions. Users are able answer questions by speaking directly to their computer and will receive responses and follow-up questions from a virtual interviewer. The program will then analyze the response, and provide feedback on the user's word choice and the overall quality of the user’s response.

## Prerequisites

Make sure you have the following installed on your machine:
- [Python](https://www.python.org/downloads/) (version 3.6 or higher)
- [pip](https://pip.pypa.io/en/stable/installation/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Getting Started

### Clone the Repository

1. Open your terminal or command prompt.
2. Navigate to the directory where you want to clone the repository.
3. Run the following command to clone the repository:

```sh
https://github.com/jnnchi/IQ-Gen.git
```

4. Navigate into the project directory.

```sh
cd your-repository
```

5. Create a virtual environment.

```sh
python -m venv venv
```

6. Activate the virtual environment.

For Windows
```sh
venv\Scripts\activate
```

For macOS and Linux
```sh
source venv/bin/activate
```

### Install the dependencies

1. Install required packages using pip.
```sh
pip install -r requirements.txt
```

### Run the Project

1. Run the app.py file
```sh
python app.py
```

2. Open your browser and go to the project url: http://127.0.0.1:7000/ 

3. Press **Get Started** to begin your mock interview.
<img width="500" alt="Screenshot 2024-06-02 at 7 25 00 AM" src="https://github.com/jnnchi/IQ-Gen/assets/70595899/10028a71-2dad-4934-80ed-38dd83fea8c2">

4. Press ‘start recording’ when you are ready to introduce yourself/record your answer to the question you get (make sure to enable microphone access).
<img width="500" alt="Screenshot 2024-06-02 at 7 27 44 AM" src="https://github.com/jnnchi/IQ-Gen/assets/70595899/98a2507a-5b46-49cd-8c6c-90d2160ee926">

5. After you have finished your response, click ‘stop recording’. 
<img width="500" alt="Screenshot 2024-06-02 at 7 28 11 AM" src="https://github.com/jnnchi/IQ-Gen/assets/70595899/eaa71554-ab24-44ae-9a58-469c4721b408">

6. After you have read your feedback, When you are ready for your next interview question, click ‘next question’.
<img width="500" alt="Screenshot 2024-06-03 at 6 02 48 PM" src="https://github.com/jnnchi/IQ-Gen/assets/104039775/1fa710f3-deb4-4f2c-a906-e22a0db1811e">

7. When you want to end the interview, click ‘end interview’. This will bring you to a results page with an analysis of your interview
<img width="500" alt="Screenshot 2024-06-03 at 6 07 22 PM" src="https://github.com/jnnchi/IQ-Gen/assets/104039775/26db747f-9cd5-4442-bac2-169500e85b23">


## (Optional) PyPi Installation - Python Files Only
Visit this link to install our Python package: [PyPi Installation](https://pypi.org/project/IQ-gen/0.1.1/). This will download **only the Python files of our project**. To download the full project, please follow the instructions for cloning from Github above.

1. Scroll down until you see a Navigation menu on the left side of the screen. 

2. Click Download Files.

3. Click the link under Source Distribution, and a zipped folder will download onto your computer.

4. Unzip the folder

5. Install dependencies if you haven’t already
```sh
pip install requirements.txt 
```

## Good luck practicing for interviews!!

