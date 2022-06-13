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

app.listen(3000, handleListen);
```
