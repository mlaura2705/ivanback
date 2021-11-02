const socket = io();

socket.on("msjguardados", (datos) => {
  msjdb(datos);
});

function msjdb(datos) {
  let ch = document.querySelector("#chat");
  let html = datos
    .map((x) => {
      return `<p><strong>${x.name}:</strong> ${x.mensaje}</p>`;
    })
    .join(" ");
  ch.insertAdjacentHTML("beforeend", html);
}

let form = document.querySelector("#btn").addEventListener("click", send);

function send(e) {
  e.preventDefault();
  let info = {
    name: document.querySelector("#name").value,
    mensaje: document.querySelector("#msj").value,
  };
  socket.emit("informacion", info);
}

socket.on("send-info", (datos) => {
  render(datos);
});

const render = (datos) => {
    let ch = document.querySelector("#chat");
    let html = `<p><strong>${datos.name}:</strong>${datos.mensaje}</p>`
    ch.insertAdjacentHTML("beforeend", html);
};
