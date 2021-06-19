// Windows의 SpeechRecognition webkit을 사용하기 위한 선언
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new SpeechRecognition();
// SpeechRecognition의 설정
recognition.continuous = false;
recognition.lang = 'ko-KR';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Voice Recognition을 Control 할 수 있게 하는 함수
import { getIsRunning, changeIsRunning } from './controller.js';
// 결과를 Event Listener에게 전달
import { outPutText } from './index.js';
// Recognition에서 마이크 입력을 받고난 뒤 인공지능의 결과 값을 처리
recognition.onresult = function(event) {
    let final_transcript = "";
    for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
        }
    }
    if(final_transcript){
        outPutText.text = final_transcript;
    }
};

// Recognition SpeechEnd & no-speech
// Voice Recognition은 말이 없거나 말이 끝나면 음성 인식을 끝낸다.
// 바깥에서 종료한 것이 아니라 그저 인식이 끝난거면 재시작을 해서 계속 인식받도록
const restart = () => {
    new Promise((resolve) => {resolve(recognition.stop());})
        .then(() => {
            
            setTimeout(() => {
                recognition.start();
            }, 300);
    });
};
recognition.onspeechend = (event) => {
    if (getIsRunning()) {
        restart();
    }
};
// 말이 없는 것을 처리하지 않게하는 설정
recognition.onerror = (event) => {
    if(event.error === 'no-speech'){
        restart();
    }
    else {
        console.log('Speech recognition error detected: ' + event.error);
    }
};

// 버튼을 클릭하면 Voice Recognition을 껐다 켰다할 수 있는 기능
export const setChangeState = (btn) => {
    btn.addEventListener('click', () => {
        if (getIsRunning()) {
            recognition.stop();
            btn.innerText = "Start";
            btn.className = "record_button record_stop";
        }
        else {
            recognition.start();
            btn.innerText = "Stop";
            btn.className = "record_button record_start";
        }
        changeIsRunning();
    });
}