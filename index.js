const express = require("express");
const { Socket } = require("socket.io");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const sqlite3 = require("./knexfile");
const chat = require("./rutas/chat");
const productos = require("./rutas/productos")

const PORT = process.env.PORT || 8080;



app.use(express.static(__dirname + "/public"));

app.get("/",(req,res)=>{
  res.send({ruta: "para mensaje ingrese /chat "})
})

//socket io

server.listen(PORT, () => {
  console.log(`server is run on port ${PORT}`);
});
app.use("/productos",productos)
app.use("/chat",chat);

io.on("connection", (socket) => {
  console.log("usuario conectado!");
  sqlite3("usermsj")
    .select("name", "mensaje")
    .then((datos) => {
      socket.emit("msjguardados", datos);
    })
    .catch((error) => {
      console.log(error);
    });

  socket.on("informacion", (data) => {
    sqlite3("usermsj")
      .insert(data).select("name","mensaje")
      .then(() => {
        console.log("registro con exito");
        io.emit("send-info",data);
      })
      .catch((err) => console.log(err));
  });
});


