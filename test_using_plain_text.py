
pitch = """
        Hi, my name is Zoey Ali and I am a junior studying Material Science and Engineering with a minor 
        in Computer Science. Last summer I interned at 3M working on a project with a team assessing the 
        heat resistance of a new plastics product. I was able to use my skills in software engineering to 
        analyze past product failures and predict upcoming product failures. While I am knowledgeable in 
        statistical applications, I also have a strong background and interest in metals, energy, and 
        manufacturing. It’s definitely been reassuring to see Boeing’s commitment to those areas in the last 
        few years.
        """

# now use ml to generate questions based on that

# questgen
# https://pypi.org/project/questgen/0.4.1/
# https://towardsdatascience.com/questgen-an-open-source-nlp-library-for-question-generation-algorithms-1e18067fcdc6

# FOLLOW THEIR README TO DOWNLOAD
# https://github.com/ramsrigouthamg/Questgen.ai

from pprint import pprint
import nltk
nltk.download('stopwords')
from Questgen import main  # ok something's weird with mine cuz the versions are conflicting
qe= main.BoolQGen()
payload = {
            "input_text": pitch
        }
output = qe.predict_boolq(payload)
pprint(output)