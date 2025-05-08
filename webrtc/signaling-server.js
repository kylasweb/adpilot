const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', userId);

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId);
      console.log('User disconnected:', socket.id);
    });
  });

  socket.on('send-message', (roomId, message) => {
    io.to(roomId).emit('receive-message', message);
  });

  socket.on('offer', (roomId, description) => {
    socket.to(roomId).emit('offer', description);
  });

  socket.on('answer', (roomId, description) => {
    socket.to(roomId).emit('answer', description);
  });

  socket.on('ice-candidate', (roomId, candidate) => {
    socket.to(roomId).emit('ice-candidate', candidate);
  });
});

server.listen(port, () => {
  console.log(`Signaling server running on port ${port}`);
});