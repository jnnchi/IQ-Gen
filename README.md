# LLM-Interviewer
Project created as part of the UTMIST LLM Acceleration program. Interprets and questions a user's answers to common computer science interview questions.

# How to Use
1. install requirements. if it doesn't work when u go into requirements.txt for some reason, run bash build.sh in terminal
2. run transcribe.py: you'll have to speak into ur computer for a specified number of seconds, then it'll transcribe it

# Current Issues
1. doesn't recognize punctuation, but ig that's not that big of a deal cuz llms get rid of punctuation anyways
2. obviously doesn't stream live, so it'll be super slow for the user, but we might be able to use a generator to stream chunks for the llm to process individually... but then the problem with that is if a chunk gets cut off mid-sentence (like the user does an extra long pause at a comma). we can't ask the user to stop for like 5secs every time they finish a sentence cuz that doesn't mimic a real interview too.

