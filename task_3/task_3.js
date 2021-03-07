const wsUri = "wss://echo.websocket.org/";

const chat = document.getElementById('output');
const chat_client = document.getElementById('client');
const chat_server = document.getElementById('server');
const btnSend = document.querySelector('.js-msg');
const btnSendGeo = document.querySelector('.js-geo');

function writeMessage(message, message_type) {
    let pre = document.createElement("div");
    pre.classList.add("message");
    if (message_type == "message_client"){
      pre.classList.add("message_client");
         pre.innerHTML = message;
         chat_client.appendChild(pre);
    } 
    else {
      pre.classList.add("message_server");
      pre.innerHTML = message;
         chat_server.appendChild(pre);
    }
}

let websocket = new WebSocket(wsUri);
websocket.onopen = function(evt){
    const btn_send = document.querySelector('.js-msg');
    btn_send.disabled = false;
    const btn_geo = document.querySelector('.js-geo');
    btn_geo.disabled = false;
}

websocket.onmessage = function(evt) {
    writeMessage(evt.data)
  };

websocket.onerror = function(evt) {
    console.log(evt.data)
};
btnSend.addEventListener('click', () => {
    const message = document.querySelector(".js-input").value;
    console.log(message);
    if (message.length > 0) {
      writeMessage(message, "message_client");
    }
    websocket.send(message);     
    
    
  });
  btnSendGeo.addEventListener('click', () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { coords } = position;
        let geoLink = document.createElement("a");
        geoLink.setAttribute('href', `https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`);
        geoLink.innerHTML = "Геолокация";
        let pre = document.createElement("div");
        pre.classList.add("message");
        pre.classList.add("message_client");
        chat_client.appendChild(pre);
        pre.append(geoLink);
      });
    } 
    
  });