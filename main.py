# record and save audio file
import sounddevice as sd
from scipy.io.wavfile import write

# transcribe audio file
import speech_recognition as sr
from os import path
from pydub import AudioSegment


def record_and_save_audio(seconds, fs, f_name):
    recording = sd.rec(int(seconds * fs), samplerate=fs, channels=1, dtype='int16')
    sd.wait()  # Wait until recording is finished
    write(f_name, fs, recording)  # Save as WAV file


if __name__ == "__main__":
    sample_rate = 44100
    secs = 2  # Duration of recording
    filename = 'output.wav'
    print(f'You have {secs} seconds to speak.')
    record_and_save_audio(secs, sample_rate, filename)
    print('Recorded.')

    r = sr.Recognizer()
    with sr.AudioFile('output.wav') as source:
        audio = r.record(source)  # read the entire audio file

        print("Transcription: " + r.recognize_google(audio))
