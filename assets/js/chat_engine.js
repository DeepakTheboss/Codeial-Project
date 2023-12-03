class ChatEngine{
    constructor(chatBoxId, userEmail, name){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.name = name;

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

        //send a message on clicking the send message button
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();
            if(msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    name: self.name,
                    chatroom: 'codeial'
                });
            }

        });

        self.socket.on('recieve_message', function(data){
            console.log("message received", data.message);
            // make li element
            let newMessage = $('<li>');
            let messageType = 'other-message';
            


            // means I am sending msg and server again send  broadcast(msg) to everyone 
            // including me means my email id is same then it means it's my message i.e self-message 
            // coming to me only via emit and on cycle.
            if(data.user_email == self.userEmail){
                messageType = 'self-message';
            }
            // indicates what is message
            newMessage.append($('<span>', {
                'html': data.message
            }));
            // who send the message
            newMessage.append($('<sub>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })

    }
} 


