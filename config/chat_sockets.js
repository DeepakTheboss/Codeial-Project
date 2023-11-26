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
        })
    })
     
}



