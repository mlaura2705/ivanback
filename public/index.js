const socket = io();

socket.on("send-info", (data) => {
  render(data)
});

const render = (data)=>{
    let html = data.map(x => {
        return `
            <p><strong>${x.name}</strong> : ${x.mensaje}</p>
        `
    }).join(" ")
    document.querySelector("#chat").innerHTML = html
}

let form = document.querySelector("#btn").addEventListener("submit",send);

function send(e) {
    e.preventDefault();
    let info = {
    name: document.querySelector("#name").value,
    mensaje: document.querySelector("#msj").value,
  };
  socket.emit("informacion", info);
}
