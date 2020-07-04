import app from '../index.js'
import mongoose from 'mongoose'
import socket from 'socket.io'

const http = require('http');

const {PORT, DB_CONNECTION} = process.env;
const server = http.createServer(app);
const io = socket(server);
io.on('connection', socket => {
    console.log('someone connected')
    socket.on("chat message", msg => {
        io.emit("chat message", msg);
    });
    socket.on('disconnect', () => {
        console.log('User had left!!!');
    })
});
mongoose
    .connect(DB_CONNECTION, {useNewUrlParser:true, useCreateIndex:true, useFindAndModify:false})
    .then(() => console.log('u are connected to DB'))
    .catch( (e) => console.log(e));

server.listen(PORT, () => console.log(`u are listening to ${PORT} port`));
