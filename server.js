const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors')
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

app.use('/public', express.static("public", {}))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

const users = {};

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["my-custom-header"],
  credentials: true
}));

io.on('connection', (socket) => {
  console.log(`A Client connected to Socket.IO server! ${socket.id}`);

  users[socket.id] = { id: socket.id, x: 0, y: 0 }


  socket.on('disconnect', () => {
    console.log(`A Client disconnected to Socket.IO server! ${socket.id}`);

    users[socket.id] = undefined
  });
});

server.listen(4444, () => {
  console.log('Socket.IO server listening on port 4444!');
});
