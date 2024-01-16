alert('hi');

const socket = new WebSocket(`ws://${window.location.host}`);
const messageList = document.querySelector('ul');
const messageForm = document.querySelector('#message');
const nickForm = document.querySelector('#nick');

function makeMessage(type, payload) {
    const msg = { type, payload };
    return JSON.stringify(msg);
}

socket.addEventListener('open', () => {
    console.log('Connected to Browser 🚀 ');
});

socket.addEventListener('message', (message) => {
    // console.log('new message: ', message.data);
    const li = document.createElement('li');
    li.innerText = message.data;
    messageList.append(li);
});

socket.addEventListener('close', () => {
    console.log('Disconnected to Server ❌ ');
});

// 서버로 10초 있다가 메세지 보내기
// setTimeout(() => {
//     socket.send('hello from the browser');
// }, 10000);

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector('input');
    socket.send(makeMessage('new_message', input.value));
    input.value = '';
}

function handleNickSubmit(event) {
    event.preventDefault();
    const input = nickForm.querySelector('input');
    socket['nick'] = input.value;
    socket.send(makeMessage('nickname', socket['nick']));
    input.value = '';
}

messageForm.addEventListener('submit', handleSubmit);
nickForm.addEventListener('submit', handleNickSubmit);
