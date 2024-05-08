function showAbout() {
    document.getElementById('about').style.display = 'block';
    document.getElementById('full-interview').style.display = 'none';
}

showAbout();

document.getElementById('show-about').addEventListener('click', function() {
    showAbout();
});

function showInterview() {
    document.getElementById('about').style.display = 'none';
    document.getElementById('full-interview').style.display = 'block';
}

document.getElementById('show-interview').addEventListener('click', function() {
    showInterview();
});

document.getElementById('get-started').addEventListener('click', function() {
    showInterview();
});


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
        console.log("this is working")

        // TESTING
        console.log("started")

        // choosing the type of audio to get from
        let options = { mimeType: 'audio/webm' }; // use WebM for broader support
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            console.error(`${options.mimeType} is not supported, trying different format.`);
            options = { mimeType: 'audio/ogg; codecs=opus' }; // Fallback to OGG
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                console.error(`${options.mimeType} is not supported either.`);
                options = {}; // Let the browser choose the default
            }
        }

        // create media recorder object
        mediaRecorder = new MediaRecorder(stream, options);
        
        console.log("CREATED MEDIA RECORDER")

        mediaRecorder.addEventListener('dataavailable', event => {
            audioBlobs.push(event.data);
            console.log(event.data)
        });

        mediaRecorder.start();
        console.log("MEDIA RECORDER STARTED")
    }).catch(error => {
        console.error('Error starting recording:', error);
    });
}


function stopRecording() {
    document.getElementById('loader-wrapper').style.display = 'flex';
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

async function sendAudioToServer(audioBlob) {
    console.log("SEND AUDIO TO SERVER STARTED")
    const formData = new FormData();
    formData.append('audio_data', audioBlob, 'recording.wav');

    console.log(audioBlob)
    console.log(formData.entries)

    await fetch('/whisper', {
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
        transcriptElement.textContent = data.transcript;
    })
    .catch(error => {
        console.error('Error sending audio to server:', error);
    });
    document.getElementById('loader-wrapper').style.display = 'none';
}

let nextQuestionButton = document.getElementById('next-question');

nextQuestionButton.addEventListener('click', () => {
    startButton.disabled = false;
    stopButton.disabled = false;
    
    transcriptElement.textContent = 'transcript appears here...';
    questionsElement.textContent = 'questions are generating...';
    toneElement.textContent = 'tone analysis will appear here...';
    userMsg.textContent = 'Start speaking.';
    recognition.stop();
    
    // maybe add the question here?
});


/* ------------------ END INTERVIEW --------------------- */
let endInterviewButton = document.getElementById('end-interview');
let finalToneAnalysis = document.getElementById('final-tone-analysis');

endInterviewButton.addEventListener('click', () => {
    document.getElementById('loader-wrapper').style.display = 'flex';

    // send a POST request to the server to process the final tone analysis
    fetch('/finaltone', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: "End of interview data processing." })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Tone Analysis:', data);
        finalToneAnalysis.textContent = 'Final Tone Analysis: ' + data['sentiment-results']; 
    })
    .catch(error => {
        console.error('Error fetching final tone analysis:', error);
        userMsg.textContent = 'Error fetching final tone analysis.';
    })
    .finally(() => {
        // hide loader
        document.getElementById('loader-wrapper').style.display = 'none';
    });
});