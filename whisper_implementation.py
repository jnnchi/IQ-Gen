"""Whisper backend for transcribing audio chunks"""

import anyio
from openai import OpenAI
client = OpenAI()


def transcribe_audio(chunk_path: str):
    audio_file = open(chunk_path, "rb")
    transcription = client.audio.transcriptions.create(
        model="whisper-1",
        file=audio_file
    )
    print(transcription.text)


transcribe_audio(input('Enter Your audio file:'))
