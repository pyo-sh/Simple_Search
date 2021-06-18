import { setChangeState } from './speechRecognition.js';

const recordBtn = document.querySelector('#recogBtn');
setChangeState(recordBtn);

let isContinue = false
// Toggle Button
const check = document.querySelector('#toggleBtn');
check.addEventListener('click', () => { isContinue = !isContinue; });

const checkDiv = document.querySelector('#check');
export let outPutText = {
    get text() {
        return this._text || '';
    },
    set text(txt) {
        this._text = txt;
        const searchIndex = txt.lastIndexOf('검색');
        if (searchIndex > 0) {
            txt = txt.slice(0, searchIndex).trim();
            checkDiv.innerHTML = txt

            const link = 'https://www.google.com/search?q=' + txt;
            if (isContinue) {
                window.open(link);
            }
            else {
                location.href = link;
            }
        }
        else {
            console.log(txt);
            checkDiv.innerHTML = txt
        }
    }
};