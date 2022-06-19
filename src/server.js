import express from "express";
import http from "http";
import SocketIO from "socket.io";

const app = express();

app.set('view engine', 'pug');
app.set('views',__dirname + '/views');
app.use('/public', express.static(__dirname+ '/public'));
app.get('/', (req, res) => res.render("home"));
app.get('/*', (req, res) => res.render("home"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const httpServer = http.createServer(app);  // express로 http 서버를 생성
const wsServer = SocketIO(httpServer);


httpServer.listen(3000, handleListen);  // 이제 3000번 포트로 http, ws 프로토콜 모두 사용 가능



wsServer.on("connection", (socket)=> {
  // socketIO를 이용하면 콜백 함수도 변수로 보낼 수 있다.(댠 가장 마지막에 들어감)
  socket.on("enter_room", (msg, done) => {
    console.log(msg);

    setTimeout(()=>{
      done('hello world');
    },10000)
  });
})



// const sockets = [];

// wss.on("connection", (socket) => { 
//   console.log("Connected to Browser");
//   sockets.push(socket);
//   socket["nickname"] = "annanimus";

//   socket.on("message", (message) => {
//     const data = JSON.parse(message);

//     switch(data.type){
//       case "message":
//         sockets.forEach(s => s.send(`${socket.nickname}: ${data.payload}`));
//         break;
//       case "nickname":
//         socket["nickname"] = data.payload;
//         break;
//       default:
//     }
//   })
// });

