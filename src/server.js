import http from 'http';
import { Server } from 'socket.io';
import WebSocket from 'ws';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express(); // app이라는 변수에 가져와서 사용

app.set('view engine', 'pug'); // 뷰 엔진을 pug로 하겠다
app.set('views', join(__dirname, 'views')); // 디렉토리 설정
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => res.render('home')); // 홈페이지로 이동할 때 사용될 템플릿을 렌더
app.get('/*', (req, res) => res.redirect('/'));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
// app.listen(3000, handleListen); // 3000번 포트와 연결

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);
httpServer.listen(3000, handleListen); // 서버는 ws, http 프로토콜 모두 이해할 수 있게 된다!

wsServer.on('connection', (socket) => {
    socket.on('join_room', (roomName) => {
        socket.join(roomName);
        socket.to(roomName).emit('welcome'); // 특정 룸에 이벤트 보내기
    });

    socket.on('offer', (offer, roomName) => {
        // offer이벤트가 들어오면, roomName에 있는 사람들에게 offer 이벤트를 전송하면서 offer를 전송한다.
        socket.to(roomName).emit('offer', offer);
    });

    socket.on('answer', (answer, roomName) => {
        socket.to(roomName).emit('answer', answer);
    });

    socket.on('ice', (ice, roomName) => {
        socket.to(roomName).emit('ice', ice);
    });
});
