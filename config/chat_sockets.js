module.exports.chatSockets =(socketServer)=>{
    // io will be handling all the connetions means has all the sockets.
    let io = require('socket.io')(socketServer, {
        // handling cors error
        cors: {
          origin: "*",  // Allow all origins
          methods: ["GET", "POST"]  // Allow only specified methods
        }
    });
    // event name 'connection' in backend but 'connect'  in frontend
    io.sockets.on('connection', function(socket){
        console.log('new connection recived', socket.id);

        socket.on('disconnect' , function(){
            console.log('socket disconnected..');
        });

// step-2 // on will detect event comes from the client and here at chatsocket we will join room
          // with some requested data from client 
          // now we want to join the socket(client) with socket_chat_room
        socket.on('join_room' , function(data){
            console.log('joining request received ', data);


// step-3    // if the data with chatroom is available then socket(user) will join the chatroom
            // if data.chatroom is not exist then new chatroom will be created and socket(user) will join the room
            socket.join(data.chatroom);

// step-4    // now whenever i will join the chatroom then all the socket(user) inside the chatroom will get
            // notification that some new user join the room and visa varsa
            // so we need to tell everyone (tell == emit)
            // in chatroom emit the message that new user joined with his data 
            //now at the frontend this should be visible or recived that user joined 


            io.in(data.chatroom).emit('user_joined', data);

            // lets code in the frontend the frontend chatengine will recieve the emit msg

        })

    });
     
}



