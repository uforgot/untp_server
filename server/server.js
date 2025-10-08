import { Server } from 'socket.io';

const io = new Server(8087, {});

io.on('connection', (socket) => {
  console.log('connected');

  // c -> s
  socket.on('s', (data) => {
    socket.broadcast.emit('r', data);
  });
});

io.on('disconnect', () => {
  console.log('disconnected');
});
