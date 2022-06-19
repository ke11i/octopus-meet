const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
form.addEventListener("submit", handleRoomSubmit);

const backendDone = (msg) => {
  console.log(`backend says : ${msg}`);
}

const handleRoomSubmit = (event) => {
  event.preventDefault();
  const input = form.querySelector("input");

  socket.emit("enter_room",{payload: input.value},backendDone);
  input.value = "";
}

