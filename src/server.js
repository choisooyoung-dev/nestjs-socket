import express from 'express'; // npm i express 설치
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express(); // app이라는 변수에 가져와서 사용

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine', 'pug'); // 뷰 엔진을 pug로 하겠다
app.set('views', join(__dirname, 'views')); // 디렉토리 설정
app.use('/public', express.static(__dirname + '/public')); // public 폴더를 유저에게 공개 (유저가 볼 수 있는 폴더 지정)
app.get('/', (req, res) => res.render('home')); // 홈페이지로 이동할 때 사용될 템플릿을 렌더
app.get('/*', (req, res) => res.redirect('/')); // 홈페이지 내 어느 페이지에 접근해도 홈으로 연결되도록 리다이렉트 (다른 url 사용 안할거라)

const handleListen = () => console.log(`Listening on http://localhost:3000`);
// app.listen(3000, handleListen); // 3000번 포트와 연결

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// function handleConnection(socket) {
//     console.log(socket);
// }
const sockets = [];
wss.on('connection', (socket) => {
    sockets.push(socket);
    console.log('Connected to Browser 🚀 ');
    socket.on('close', () => console.log('Disconnected to Server ❌ '));
    socket.on('message', (message) => {
        const utf8Message = message.toString('utf8');
        console.log(utf8Message);
        sockets.forEach((aSocket) => aSocket.send(utf8Message));
    });
    // socket.send('hello!!');
});

server.listen(3000, handleListen);
