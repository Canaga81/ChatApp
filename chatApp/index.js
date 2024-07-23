const express = require('express');
const app = express();
const socket = require('socket.io');
const dotenv = require('dotenv/config')
const port = process.env.PORT

const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

app.use(express.static('public'));

const io = socket(server);

io.on('connection', (socket) => {

    console.log(socket.id);

    socket.on('chat', data => {
        io.sockets.emit('chat', data)
    });

    socket.on('typing', data => {
        socket.broadcast.emit('typing', data)
    });
    
})