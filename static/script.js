/* ------------------ SPEECH RECOGNITION --------------------- */
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// init speechrecog object + built in variables
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

// text to insert 
let transcriptElement = document.getElementById('transcript');
let questionsElement = document.getElementById('questions');
let toneElement = document.getElementById('tone-analysis');
let userMsg = document.getElementById('usr-msg');

// buttons
let startButton = document.getElementById('start-record-btn');
let stopButton = document.getElementById('stop-record-btn');

// web speech API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    transcriptElement.textContent = transcript;
    if (e.results[0].isFinal) {
        transcriptElement.textContent += ' ';
    }
});
recognition.addEventListener('end', recognition.start);

// START AND STOP RECORDING BUTTONS
startButton.addEventListener('click', () => {
    recognition.start();
    // can't keep clicking start once u start
    startButton.disabled = true;
    stopButton.disabled = false;
    userMsg.textContent = "Start speaking.";
});
stopButton.addEventListener('click', () => {
    recognition.stop();
    startButton.disabled = false;
    stopButton.disabled = true;
    sendTranscriptToServer(transcriptElement.textContent);
});

// SEND FINAL TRANSCRIBED SPEECH TO FLASK SERVER
// SOURCE: https://www.geeksforgeeks.org/pass-javascript-variables-to-python-in-flask/
function sendTranscriptToServer(transcript) {
    fetch('/analyze_transcript', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript: transcript })
    })
    .then(response => response.json()) // get the flask response
    .then(data => {
        console.log('Success:', data);
        questionsElement.textContent = data['questions'];
        toneElement.textContent = data['tone analysis']
    })
    .catch((error) => {
        console.error('Error:', error);
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
