# this is a list of messages that corraspond to the top emotions that your text contains
# note that these are all written in a way that makes them only good for giving the #1 bit of feedback to a response
# we may want to go for a different system of making these, like small pieces spliced together, but this works for now

system_messages = {
    'admiration': 'The top emotion displayed within your response is admiration. Thats a great way to show the interviewer youre interested!',
    'amusement': 'Your reponse showed amusement. Not alltogether a bad thing, but make sure to keep it to a minimum so you seem like youre taking the interview seriously.',
    'anger': 'Oh dear. Your reply was quite angry... Make sure to keep your emotions in control for the next question.',
    'annoyance': 'You seemed quite annoyed in your response. Try to sound a little more positive and excited in your next question!',
    'approval': 'You were approving in your repsonse this time. Great work!',
    'caring': 'This response showed that you care. Thats perfect! Keep it up!',
    'confusion': 'You... seemed a little confused in this answer. Maybe try and speak more confidently next time.',
    'curiosity': 'Your response was quite curious! Thats great; interviewers like to see you are inquisitive.',
    'desire': 'This response showed how much you want this job. Nice going! *Thumbs Up Emoji*',
    'disappointment': 'Your reply reflects disappointment. Analyze the areas that fell short and work on improvements for the next question.',
    'disapproval': 'Theres a sense of disapproval in your answer. Identify the concerns raised and take steps to address them for your next reply.',
    'disgust': 'Your response carries a tone of disgust. Try your best to keep feelings of disgust covered up in a professional setting.',
    'embarrassment': 'Your response contained moments of embarrassment. Learn from these instances to handle similar situations with more confidence moving forward.',
    'excitement': 'Your enthusiasm came through in the response. Keep up the excitement; it adds a positive energy to your responses.',
    'fear': 'Theres an element of fear in your response. Work on managing nerves to present a more composed and confident demeanor in future replies.',
    'gratitude': 'Your top emotion throughout this response is gratitude. That\'s awesome. Bless up brotha.',
    'grief': 'This answer conveys a sense of grief. Reflect on the areas that may have contributed to this, and work to try and heal those personal areas.',
    'joy': 'Joy radiates from this response. Maintain this positive vibe; it resonates well with interviewers.',
    'love': 'The reply reflects a sense of love. Continue to showcase your passion; it adds a genuine and appealing touch to your responses.',
    'nervousness': 'Nervousness is evident in this partifular response. Work on strategies to calm nerves and present a more relaxed demeanor in future interviews.',
    'optimism': 'Optimism shines through this one! Keep up the positive outlook; it enhances your overall interview presence.',
    'pride': 'Pride is evident in your response here. Celebrate your achievements and use this confidence to propel yourself forward in future interviews.',
    'realization': 'This response suggests moments of realization. Embrace these insights to refine your approach and perform even better in subsequent interviews.',
    'relief': 'A sense of relief is conveyed in your answer here. Channel this into motivation for continuous improvement in future interviews.',
    'remorse': 'This reply carries a touch of remorse. Learn from any missteps and approach your next reply with a renewed focus on improvement.',
    'sadness': 'Sadness is apparent your reply here. Use this as motivation to address concerns and present a more positive demeanor in the next opportunity.',
    'surprise': 'Surprise is reflected in this response. Try to be ready for unexpected questions in future questions.',
    'neutral': 'Your response seemed neutral here. While this isnt a outstanding concern concerns, try to sound a little more excited next question.'
}

overused_words = {
    'amazing': 'Lastly, not to use the word \'amazing\' too much. It tends to be overused in interviews.',
    'actually': 'You also used the word \'acually\', which is often used to correct people, and thus has incurred a negative meaning. Make sure to double-check your usage of it, you dont want to be correcting your interviewer.',
    'basically': 'Additionaly, using \'basically\' can make you seem like you are over-simplifying, and can make you seem unprofessional. Try to avoid it.',
    'fired': 'Also, try not to use the negatively charged word \'fired\'. Instead, try using \'laid off\' or \'let go\'',
    'just': 'Take note of when you use the word \'just\', it usually is either a filler word or a defensive word.',
    'kinda': 'Also, try to not use the word \'kinda\' next time. It isnt the most professional word choice.',
    'whatever': 'Your use of the word \'whatever\' also has a ring of unprofessionalism, so watch that one next time.'
}

disallowed_words = {}


def flag_um(plaintext: str) -> str:
    if plaintext.count('um') >= 2:
        return ' You used \'um\' quite a few times within this response. Try and reduce filler words like that, since they dont project conficence.'
    elif plaintext.count('ah') >= 3:
        return ' Try your best to cut back on using \'ah\' between words next time. That will make you sound more assertive.'
    elif plaintext.count('uh') >= 2:
        return ' Next time, try to reduce your use of \'uh\', since it can make you sound less credible'
    else:
        return ''


def flag_overused_words(plaintext: str) -> str:
    for word in overused_words:
        if word in plaintext:
            return overused_words[word]
        else:
            return ''


def flag_disallowed_words(plaintext: str) -> str:
    for word in overused_words:
        if word in plaintext:
            return ' You also really should avoid using the word ' + word + ' in your response.'
        else:
            return ''
