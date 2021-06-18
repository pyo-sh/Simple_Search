const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new SpeechRecognition();
// console.dir(recognition)
// let speechRecognitionList = new SpeechGrammarList();
// let grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
// speechRecognitionList.addFromString(grammar, 1);

// Setting Recognitions
// recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'ko-KR';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Check is Running
let isRunning = false;

import { outPutText } from './index.js'
// Recognition에서 마이크 입력을 받고난 뒤 인공지능의 결과 값을 처리
recognition.onresult = function(event) {
    let final_transcript = "";
    // let interim_transcript = "";
    for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
        }
        // else {
        //     interim_transcript += event.results[i][0].transcript;
        // }
    }
    // if(interim_transcript){
    //     setInterim(interim_transcript);
    // }
    if(final_transcript){
        outPutText.text = final_transcript;
    }
}

// Recognition SpeechEnd & no-speech
// 바깥에서 종료한 것이 아니라 그저 인식이 끝난거면 재시작을 해서 계속 인식받도록
const restart = () => {
    new Promise((resolve) => {resolve(recognition.stop());})
        .then(() => {
            
            setTimeout(() => {
                recognition.start();
            }, 300);
    });
}
recognition.onspeechend = (event) => {
    if (isRunning) {
        restart();
    }
};
// Error 처리
recognition.onerror = (event) => {
    // 나는 말이 없는 것을 처리하지 않을 것이다.
    if(event.error === 'no-speech'){
        restart();
    }
    else {
        console.log('Speech recognition error detected: ' + event.error);
    }
}

export const setChangeState = (btn) => {
    btn.addEventListener('click', () => {
        if (isRunning) {
            isRunning = false;
            recognition.stop();
            console.dir(btn)
            btn.innerText = "Start";
            btn.className = "record_stop";
        }
        else {
            isRunning = true;
            recognition.start();
            btn.innerText = "Stop";
            btn.className = "record_start";
        }
    });
}