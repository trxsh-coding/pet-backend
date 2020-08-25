import app from '../index.js'
import mongoose from 'mongoose'
import socket from 'socket.io'

const http = require('http');

const {PORT, DB_CONNECTION} = process.env;
const server = http.createServer(app);
const io = socket(server);
export const clients = new Map()
io.on('connection', socket => {
    let id = socket.handshake.query.id
    clients.set(id, {socketID:socket.id})
    console.log(clients)

    socket.on('private-message', (data) => {
        console.log(data)
        const client = clients.get(data.receiverId)
        io.to(client.socketID).emit('get-message', 'I just met you')
    })


    socket.on('disconnect', (callback) => {
        console.log('User had left!!!');
    })
});

mongoose
    .connect(DB_CONNECTION, {useNewUrlParser:true, useCreateIndex:true, useFindAndModify:false})
    .then(() => console.log('u are connected to DB'))
    .catch( (e) => console.log(e));

server.listen(PORT, () => console.log(`u are listening to ${PORT} port`));
