const server = require('http').createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

const PORT = process.env.PORT || 4000;
const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';

//establish connection with socket.io
io.on('connection', (socket) => {
  console.log(`Client ${socket.id} connected`);

  //Join a convo
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  //Listen for incoming messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  //Leave room if user closes the socket
  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} disconnected`);
    socket.leave(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
