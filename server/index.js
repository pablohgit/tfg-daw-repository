// Archivo principal de configuracion del servidor

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");
const userRoutes = require("./routers/userRoutes");
const messageRoutes = require("./routers/messageRoutes");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

/**
 * Conexion con la base de datos utilizando las variables del archivo .env
 */
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("DB Connection successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

const PORT = process.env.PORT || 6001;

/**
 * Creamos una expresion donde hacemos que la app escuche en el puerto por defecto o el que viene en el .env
 */
const server = app.listen(PORT, () => {
  console.log(`Server is started in the port: ${process.env.PORT}`);
});

/**
 * Asociamos la libreria socket con sus respectivos params, como puede ser el server y el origin que va a observar la aplicacion del cliente
 */
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});

/**
 * Creamos una instancia de Map
 */
global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
});
