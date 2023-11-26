class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        //chat_engine.js or we will emit an connect event then chat_sockets.js will recive a connection.
        // and this(backend) emits back(acknolwdeged) that u are connected using connect event 
        // using line no. 17 'connection established'
        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }

    }

    connectionHandler(){
        let self = this;  // this has been change inside the onconnect 
        this.socket.on('connect', function(){
            console.log(`connection established using sockets...!`);


  // step-1   // once we are connected to socket ask to join room
            // whenever i am sending a request to join a room along with that i am sending data
            // data means with which user wants to send request(chat with) and which room you want to join
            // 1. in starting i my self wants to join with my email id 
            // 2. and i will join room name (codeial room)
            // when this event will be emitted then this event will be received at chat_sockets.js(backend)
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            });


 // step-5 // chatengine will detect that new user joined the chatroom with server socket           
            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);
            })

        })
    }
} 


