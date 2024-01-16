alert('hi');

const socket = new WebSocket(`ws://${window.location.host}`);
const messageList = document.querySelector('ul');
const messageForm = document.querySelector('form');

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector('input');
    socket.send(input.value);
    input.value = '';
}

messageForm.addEventListener('submit', handleSubmit);

socket.addEventListener('open', () => {
    console.log('Connected to Browser 🚀 ');
});

socket.addEventListener('message', (message) => {
    console.log('new message: ', message.data);
});

socket.addEventListener('close', () => {
    console.log('Disconnected to Server ❌ ');
});

setTimeout(() => {
    socket.send('hello from the browser');
}, 10000);
