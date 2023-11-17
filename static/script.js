window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// init speechrecog object + built in variables
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

// text to insert 
let transcriptElement = document.getElementById('transcript');
let resultElement = document.getElementById('result');

// buttons
let startButton = document.getElementById('start-record-btn');
let stopButton = document.getElementById('stop-record-btn');

// web speech API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
// SOURCE: chatgpt LOL
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

// button behavior when clicked
startButton.addEventListener('click', () => {
    recognition.start();
    // can't keep clicking start once u start
    startButton.disabled = true;
    stopButton.disabled = false;
});
stopButton.addEventListener('click', () => {
    recognition.stop();
    startButton.disabled = false;
    stopButton.disabled = true;
    sendTranscriptToServer(transcriptElement.textContent);
});

// function to send transcript to flask server
// SOURCE: https://www.geeksforgeeks.org/pass-javascript-variables-to-python-in-flask/
function sendTranscriptToServer(transcript) {
    fetch('/analyze_transcript', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript: transcript })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        resultElement.textContent = data['analysis'];
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}