module.exports.chatSockets = function (socketServer) {
    const Server = require('socket.io')
    //It will be handling the connections
    let io = Server(socketServer, {
      // Fixing the cors issue
      cors: {
        origin: 'http://35.172.214.243:8000',
      },
    })
    //   console.log(io.sockets.on)
    io.sockets.on('connection', function (socket) {
      console.log('New Connect Recieved ::', socket.id)
  
  
      socket.on('disconnect', function () {
        console.log('Socket disconnected')
      })
  
      socket.on('join_room',function (data) {
  
        // console.log('Joining Request Recieved By codeial',data);
  
        socket.join(data.chatroom)
  
        io.in(data.chatroom).emit('user_joined',data)
        
      })
  
      socket.on('send_message',function (data) {
  
        io.in(data.chatroom).emit('recieve_message',data)
        
      })
    })
  }

// module.exports.chatSockets = function(socketServer){
//     let io = require('socket.io')(socketServer);

//     io.sockets.on('connection', function(socket){
//         console.log('new connection received', socket.id);

//         socket.on('disconnect', function(){
//             console.log('socket disconnected!');
//         });

//         socket.on('join_room', function(data){
//             console.log('joining request rec.', data);

//             socket.join(data.chatroom);

//             io.in(data.chatroom).emit('user_joined', data);
//         });

//         // CHANGE :: detect send_message and broadcast to everyone in the room
//         socket.on('send_message', function(data){
//             io.in(data.chatroom).emit('received_message', data);
//         });
//     });
// }

