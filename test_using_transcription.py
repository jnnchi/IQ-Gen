# record and save audio file
import sounddevice as sd
from scipy.io.wavfile import write

# transcribe audio
import speech_recognition as sr
import os
from pydub import AudioSegment
from pydub.silence import split_on_silence


def record_and_save_audio(seconds, fs, f_name):
    recording = sd.rec(int(seconds * fs), samplerate=fs, channels=1, dtype='int16')
    sd.wait()  # Wait until recording is finished
    write(f_name, fs, recording)  # Save as WAV file


# TRANSCRIBE AUDIO FILE BY CHUNKS
# SOURCE: https://thepythoncode.com/article/using-speech-recognition-to-convert-speech-to-text-python#google_vignette
# recognize speech in the audio file (avoids repetition)
def transcribe_audio(path, r):
    # use the audio file as the audio source
    with sr.AudioFile(path) as source:
        audio_listened = r.record(source)
        # use google to conv to text
        text = r.recognize_google(audio_listened)
    return text


# splits the audio file into chunks on silence
# and applies speech recognition
def get_large_audio_transcription_on_silence(path, r):
    """Splitting the large audio file into chunks
    and apply speech recognition on each of these chunks"""

    # open the audio file using pydub
    sound = AudioSegment.from_file(path)
    # split audio sound where silence is 500 miliseconds or more and get chunks
    chunks = split_on_silence(sound,
        min_silence_len = 500,
        silence_thresh = sound.dBFS-14,
        keep_silence=500,
    )
    folder_name = "audio-chunks"
    # create a directory to store the audio chunks
    if not os.path.isdir(folder_name):
        os.mkdir(folder_name)
    whole_text = ""
    # process each chunk
    for i, audio_chunk in enumerate(chunks, start=1):
        # export audio chunk and save it in
        # the `folder_name` directory.
        chunk_filename = os.path.join(folder_name, f"chunk{i}.wav")
        audio_chunk.export(chunk_filename, format="wav")
        # recognize the chunk
        try:
            text = transcribe_audio(chunk_filename, r)
        except sr.UnknownValueError as e:
            print("Error:", str(e))
        else:
            text = f"{text.capitalize()}. "
            print(chunk_filename, ":", text)
            whole_text += text
    # instead of returning whole text,
    # should yield one smaller text segment at a time
    return whole_text


if __name__ == '__main__':
    # super inefficient; this takes the entire audio file
    # then chunks entire audio file
    # then loops through each chunk to transcribe it

    # we should actually:
    # 1) as we're recording -> we chunk
    # 2) yield one chunk to speech recognizer
    # 3) transcribe one chunk
    # 4) stream chunks to LLM

    # but this file lets us have a whole text to start working with LLM to question the text
    # we can figure out better structure later

    sample_rate = 44100
    secs = 10  # Duration of recording
    filename = 'output.wav'
    print(f'You have {secs} seconds to speak.')
    record_and_save_audio(secs, sample_rate, filename)
    print('Recorded.\n')

    # create a speech recognition object
    r = sr.Recognizer()
    full_text = get_large_audio_transcription_on_silence(filename, r)
    print(f"\nFull text: {full_text}")

    # can use sentiment analysis to also tell user how they came off
    # like "you sounded overly arrogant" or "you sounded unsure/sad"
    # https://realpython.com/python-nltk-sentiment-analysis/

    """"
    stuff that could help us out:
    - https://towardsdatascience.com/questgen-an-open-source-nlp-library-for-question-generation-algorithms-1e18067fcdc6
    """
