// NEW
// https://franzeus.medium.com/record-audio-in-js-and-upload-as-wav-or-mp3-file-to-your-backend-1a2f35dea7e8
/* ------------------ RECORD AUDIO USING JS --------------------- */
let mediaRecorder = null;
let audioBlobs = [];
let capturedStream = null;

// text to insert 
let transcriptElement = document.getElementById('transcript');
let questionsElement = document.getElementById('questions');
let toneElement = document.getElementById('tone-analysis');
let userMsg = document.getElementById('usr-msg');

// buttons
let startButton = document.getElementById('start-record-btn');
let stopButton = document.getElementById('stop-record-btn');

// START AND STOP RECORDING BUTTONS
startButton.addEventListener('click', () => {
    startRecording();
    // can't keep clicking start once u start
    startButton.disabled = true;
    stopButton.disabled = false;
    userMsg.textContent = "Start speaking.";
});

stopButton.addEventListener('click', () => {
    stopRecording().then(audioBlob => {
        sendAudioToServer(audioBlob, 'wav');
    });
    startButton.disabled = false;
    stopButton.disabled = true;
});

function startRecording() {
    navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true }
    }).then(stream => {
        audioBlobs = [];
        capturedStream = stream;

        let options = { mimeType: 'audio/webm' }; // use WebM for broader support
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            console.error(`${options.mimeType} is not supported, trying different format.`);
            options = { mimeType: 'audio/ogg; codecs=opus' }; // Fallback to OGG
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                console.error(`${options.mimeType} is not supported either.`);
                options = {}; // Let the browser choose the default
            }
        }

        mediaRecorder = new MediaRecorder(stream, options);

        mediaRecorder.addEventListener('dataavailable', event => {
            audioBlobs.push(event.data);
        });

        mediaRecorder.start();
    }).catch(error => {
        console.error('Error starting recording:', error);
    });
}


function stopRecording() {
    return new Promise((resolve, reject) => {
        if (!mediaRecorder) {
            reject(new Error("MediaRecorder not initialized"));
            return;
        }

        const onStop = () => {
            const mimeType = mediaRecorder.mimeType;
            const audioBlob = new Blob(audioBlobs, { type: mimeType });

            if (capturedStream) {
                capturedStream.getTracks().forEach(track => track.stop());
            }

            mediaRecorder.removeEventListener('stop', onStop); // Clean up the event listener
            resolve(audioBlob);
        };

        mediaRecorder.addEventListener('stop', onStop);
        mediaRecorder.stop();
    });
}

function sendAudioToServer(audioBlob) {
    const formData = new FormData();
    formData.append('audio_data', audioBlob, 'recording.wav');

    fetch('/whisper', {
        method: 'POST',
        cache: 'no-cache',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Here we read the response as JSON.
    })
    .then(data => {
        console.log('Success:', data);
        questionsElement.textContent = data.questions;
        toneElement.textContent = data['tone analysis'];
    })
    .catch(error => {
        console.error('Error sending audio to server:', error);
    });
}

let nextQuestionButton = document.getElementById('next-question');

nextQuestionButton.addEventListener('click', () => {
    startButton.disabled = false;
    stopButton.disabled = false;
    
    transcriptElement.textContent = '';
    questionsElement.textContent = '';
    toneElement.textContent = '';
    userMsg.textContent = '';
    recognition.stop();
    
    // maybe add the question here?
});
