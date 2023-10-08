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
def get_large_audio_transcription_on_silence(path):
    """Splitting the large audio file into chunks
    and apply speech recognition on each of these chunks"""
    # open the audio file using pydub
    sound = AudioSegment.from_file(path)
    # split audio sound where silence is 500 miliseconds or more and get chunks
    chunks = split_on_silence(sound,
        # experiment with this value for your target audio file
        min_silence_len = 500,
        # adjust this per requirement
        silence_thresh = sound.dBFS-14,
        # keep the silence for 1 second, adjustable as well
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
            text = transcribe_audio(chunk_filename)
        except sr.UnknownValueError as e:
            print("Error:", str(e))
        else:
            text = f"{text.capitalize()}. "
            print(chunk_filename, ":", text)
            whole_text += text
    # return the text for all chunks detected
    return whole_text


if __name__ == '__main__':
    sample_rate = 44100
    secs = 10  # Duration of recording
    filename = 'output.wav'
    print(f'You have {secs} seconds to speak.')
    record_and_save_audio(secs, sample_rate, filename)
    print('Recorded.\n')

    # create a speech recognition object
    r = sr.Recognizer()
    print(f"\nFull text: {get_large_audio_transcription_on_silence(filename, r)}")