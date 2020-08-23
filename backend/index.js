const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.get("/", (req, res) => {
  res.send("<h1>Hello from server</h1>");
});

io.on("connection", socket => {
  console.log("we have a new connetion!");

  socket.on("disconnect", () => {
    console.log("user have left!");
  });
});

server.listen(PORT, () => console.log(`server has started on port ${PORT}`));
