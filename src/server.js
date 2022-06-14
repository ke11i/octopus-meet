import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();

app.set('view engine', 'pug');
app.set('views',__dirname + '/views');
app.use('/public', express.static(__dirname+ '/public'));
app.get('/', (req, res) => res.render("home"));
app.get('/*', (res, req) => res.render("home"));


const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);  // express로 http 서버를 생성
const wss = new WebSocket.Server({server}); // websocket서버를 생성하는데 server를 전달할 수 있음

wss.on("connection", (socket) => { 
  console.log("Connected to Browser");

  socket.on("close", ()=>{
    console.log("Disconnectied from the Browser")
  })

  socket.on("message", (message, isBinary) => {
    message = isBinary ? message:message.toString()
    console.log(message);
  })
  socket.send("hello!!!");
});



server.listen(3000, handleListen);  // 이제 3000번 포트로 http, ws 프로토콜 모두 사용 가능
