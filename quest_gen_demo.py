from pprint import pprint
import nltk
nltk.download('stopwords')
from Questgen import main
qe= main.BoolQGen()
payload = {
            "input_text": "Hi, my name is Samantha Atcheson, and I am a senior Environmental Sciences major. Im looking for a position that will allow me to use my research and analysis skills. Over the past few years, Ive been strengthening these skills through my work with a local watershed council on conservation strategies to support water quality and habitats. Eventually, Id like develop education programs on water conservation awareness. I read that your organization is involved in water quality projects. Can you tell me how someone with my experience may fit into your organization? "}
output = qe.predict_boolq(payload)
pprint (output)
