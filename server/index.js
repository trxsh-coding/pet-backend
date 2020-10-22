import app from '../index.js'
import mongoose from 'mongoose'
import socket from 'socket.io'
import Message from '../models/message'
import User from '../models/user'
const server = require('http').Server(app);
const DB_CONNECTION = process.env.DB_CONNECTION;
const port = process.env.PORT || 5000
export const io = socket(server);
export const clients = new Map()
server.listen(port || 3000, () => console.log(`trash ${port} port`));

io.on('connection', async socket => {
    let id = socket.handshake.query.id
    clients.set(id, {socketID:socket.id})
    console.log(clients)
    app.set('socket', socket);
    app.set('io', io);
    const user = await User.findByIdAndUpdate(id, {
        online:true
    })
    socket.on('disconnect', async (callback) => {
        console.log(callback)
        clients.delete(socket.handshake.query.id)
        await User.findByIdAndUpdate(id, {
            online:false,
            lastSeen:Date.now()
        })
    })
});

mongoose
    .connect(DB_CONNECTION, {useNewUrlParser:true, useCreateIndex:true, useFindAndModify:false})
    .then(() => console.log('u are connected to DB'))
    .catch( (e) => console.log(e));

