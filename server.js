const routes = require('./routes');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors')

const app = express();
app.use(cors)
app.use('/', routes);
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected to Socket.IO server!');

  socket.on('disconnect', () => {
    console.log('Client disconnected from Socket.IO server!');
  });
});

server.listen(3000, () => {
  console.log('Socket.IO server listening on port 3000!');
});


