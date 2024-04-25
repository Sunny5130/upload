const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const app = express();
const server = app.listen(3000, () => {
    console.log("Server Started");
});

app.use(express.static(path.join(__dirname)));

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log("A user is connected to server");


    socket.on('chat message', (msg) => {
        io.emit('chat message', { username: socket.username, message: msg });
    });


    socket.on('user joined', (username) => {
        socket.username = username; 
        io.emit('user joined', username);
    });


    socket.on('disconnect', () => {
        if (socket.username) {
            io.emit('user left', socket.username);
        }
    });
});





































// const express=require('express');
// const socketIO=require('socket.io');
// const path=require('path');
// const app=express();
// const server=app.listen(3000,()=>{
//     console.log("Server Started");
// });

// app.use(express.static(path.join(__dirname)));

// const io=socketIO(server);

// io.on('connection',(socket)=>{
//     console.log("A user is connected to server");
//     socket.on('chat message',(msg)=>{
//         io.emit('chat message',msg);
//     });

// })



