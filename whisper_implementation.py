"""Whisper backend for transcribing audio chunks"""

# so, theoretically, we should be able to inport this file into our app.py, and then call this function on each chunk that
# we get from the audio recording
# Then, it will transcribe from each chunk, and we can add them together and pass that string to chatGPT


import anyio
from openai import OpenAI
from pvrecorder import PvRecorder
import wave
import struct


devices = PvRecorder.get_available_devices()
recorder = PvRecorder(device_index=-1, frame_length=512)
audio = []
path = 'audio_temp/audio_block.wav'


def record_audio():
    """Records the audio from your default microphone, exporting it as a wav file"""
    recorder.start()
    time = 0

    # Right now this records for 2000 ticks (or whatver weird unit of measurement)
    # This will be changed to a button press in flask later
    while time < 400:
        frame = recorder.read()
        audio.extend(frame)
        time += 1
    recorder.stop()
    with wave.open(path, 'w') as f:
        f.setparams((1, 2, 16000, 512, "NONE", "NONE"))
        f.writeframes(struct.pack("h" * len(audio), * audio))
    recorder.delete


# This is the whisper transcription of the audio file. It is actually really quick, so I don't think we need audio chunking
client = OpenAI(api_key='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')


def transcribe_audio(chunk_path: str) -> str:
    """Takes a file path for an audio file and transcribes it into a string"""

    audio_file = open(chunk_path, "rb")
    transcription = client.audio.transcriptions.create(
        model="whisper-1",
        file=audio_file
    )
    return transcription.text


# Here's where you can test the function
#
if input('Type Y: ').lower() == 'y':
    record_audio()
    print('transcribing...')
    print(transcribe_audio('audio_temp/audio_block.wav'))


print(transcribe_audio(input('Input file path here:')))
