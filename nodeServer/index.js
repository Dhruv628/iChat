// node server which will handle Socket.io connection
const io = require("socket.io")(8000, {cors: {} });

const users={};

io.on('connection',socket=>{
    //If any new user joins , let other users connected to the server know
    socket.on('new-user-joined',name=>{
        console.log('new user',name)
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    //If someone sends a message , broadcast it to the other people
    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message : message , name:users[socket.id] ,})
    });
    //if a user leaves the chat , broadcast it to the other users
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',{ name:users[socket.id] ,})
        delete users[socket.id];
    });
    
})