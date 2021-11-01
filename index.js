const express = require("express");
const { Socket } = require("socket.io");
// const knex = require("./db");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const sqlite3 = require("./knexfile");
// const chat = require("./rutas/chat");

app.use(express.json());

const PORT = process.env.PORT || 8080;

// app.post("/", (req, res) => {
//   let obj = {
//     name: req.body.name,
//     description: req.body.description,
//     price: req.body.price,
//   };
//   knex("productos")
//     .insert(obj)
//     .then(res.send({ msj: "producto agregado con exito!" }))
//     .catch(res.send({ msj: "error al agregar producto" }));
// });

// KNEX CON SQLITE3
app.post("/",(req,res)=>{
    let obj = {
        name:req.body.name,
        email: req.body.email,
        mensaje: req.body.mensaje
    }
    sqlite3("usermsj")
    .insert(obj)
    .then(res.send({msj:"producto agregado con exito!"}))
    .catch(res.send({msj:"error al agregar producto"}))
})

app.get("/", (req, res) => {
  res.send("Bienvenido a la home");
});

app.use(express.static(__dirname + "/public"));

app.get("/chat", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

//socket io
const mensajes = [];

server.listen(PORT, () => {
  console.log(`server is run on port ${PORT}`);
});
io.on("connection", (socket) => {
  console.log("usuario conectado!");
  socket.on("informacion", (data) => {
    mensajes.push(data);
    sqlite3("usermsj")
      .insert(mensajes)
      .then(() => {
        io.sockets.emit("send-info", mensajes);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        sqlite3.destroy();
      });
  });
});

// app.use("/chat",chat);
