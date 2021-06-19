// SpeechRecognition이 Running인지 아닌지
let isRunning = false;

export const getIsRunning = () => {
    return isRunning;
}

export const changeIsRunning = () => {
    isRunning = !isRunning;
}

// 새로운 검색 창을 열 것인지 아닌지
let isContinue = false

export const getIsContinue = () => {
    return isContinue;
}

export const changeIsContinue = () => {
    isContinue = !isContinue;
}