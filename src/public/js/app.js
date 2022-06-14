const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nickname");

const socket = new WebSocket(`ws://${window.location.host}`);

const makeMessage = (type, payload) => JSON.stringify({type, payload});


const handleSubmit = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("message", input.value));

  const li = document.createElement("li");
  li.innerText = `You: ${input.value}`;
  messageList.append(li);
};

const handleNickSubmit = (event) => {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname",input.value));
};


messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);



socket.addEventListener("message", ({data}) => {
  const li = document.createElement("li");
  li.innerText = data;
  messageList.append(li);
});










socket.addEventListener("open", () => {
  console.log("Connected to Server");
});

socket.addEventListener("close", () => {
  console.log("Disconnected to Server");
});


