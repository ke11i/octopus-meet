# Octopus Meet
Zoom clone using WebRTC and Websockets


## NodeJS 속성으로 이해하기
`nodemon`: 프로젝트에서 변경사항이 있을 시 서버를 재시작해주는 프로그램
```json
/* nodemon.json파일 */
{
  // 해당 파일은 변경이 일어나도 재시작하지 않음
  "ignore": ["src/public/*"],
  // 사실상 서버 재시작이라기보다 babel-node를 실행하여 server.js를 컴파일함
  "exec":"babel-node src/server.js"
}
```

`express`: 서버를 만들고, 라우팅을 돕고, 미들웨어를 추가할 수 있게 해주는 node의 웹 프레임워크
```javascript
/* src/server.js 파일 */
import express from "express";

const app = express();

// view 엔진을 pug로 설정
app.set('view engine', 'pug');
// views 디렉토리 설정
app.set('views', __dirname + '/views');
// frontend에 해당하는 경로 설정(css, 이미지 등을 사용하기 위해)하여 유저에게 공유하는 역할
app.use('/public', express.static(__dirname + '/public'));
// 홈페이지 주소에 맞는 템플릿을 렌더하는 부분
app.get('/', (req, res) => res.render("home"));
app.get('/*', (res, req) => res.render("home"));


const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);  // express로 http 서버를 생성
app.listen(3000, handleListen); // 이제 3000번 포트로 http 프로토콜 사용 가능

```
<br/>

## HTTP vs WebSocket
> HTTP, WebSocket 모두 propocol이다.
![http vs websocket](https://1.bp.blogspot.com/-iGGehbQ-j0Y/XnzF5N2gF8I/AAAAAAAAMVs/olfPCU8mxE4kNMMa7qdv70STtn3owJ4zACLcBGAsYHQ/w680/ws01.png)

`http`: user가 request를 보내고 server는 response를 보낸다. 중요한점은 **http는 stateless하다. 즉, 서버는 user가 누구인지 기억하지 못한다.** response를 보낸 뒤에 서버는 해당 요청을 종료처리(유저 기억 안함)한 뒤 다른 request를 기다리는 상태가 된다. 
- http에서 쿠기, 토큰 등을 이용해 매번 authentication 처리를 해야하는 이유도 해당 user가 누구였는지를 알려주기 위함이다.
- request는 항상 유저가 요청한다. 즉, 어느날 서버가 갑자기 유저에게 말을 건다거나 하는 일은 생길 수 없다.
- 1 request => 1 response

`webSocket`: user가 request를 보내면 서버가 받거나 거절한다. 서버가 수락하면 유저와 서버간 연결이 성립된다. w**ebSocket은 bi-directional(양방향)이다. 즉, 연결이 되어 있기 때문에 서버는 유저가 누구인지 판별이 가능해진다.**
- webSocket을 사용할 때, 서버는 유저가 누구인지 알 수 있으므로 어느때나 사용자의 request를 기다릴필요 없이 먼저 말을 걸 수 있다.
- n request <=> m respnse
- 당연하게도 서버와 서버 간의 통시에도 사용 가능한 프로토콜이다.


