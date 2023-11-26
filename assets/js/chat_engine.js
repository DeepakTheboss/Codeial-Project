class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        //chat_engine.js or we will emit an connect event then chat_sockets.js will recive a connection.
        // and this emits back that u are connected using connect event 
        // using line no. 17 'connection established'
        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }

    }

    connectionHandler(){
        this.socket.on('connect', function(){
            console.log(`connection established using sockets...!`);
        })
    }
} 


