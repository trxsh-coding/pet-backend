import express from 'express';
import bodyParser from 'body-parser';
import usersRoute from './routes/user'
import chatRoute from './routes/chat'
import petRoute from './routes/pet'
import postRoute from './routes/post'
import messageRoute from './routes/message'
import notificationRoute from './routes/notification'
import likeRoute from './routes/like'
import missingRoute from './routes/missing'
import bookmarkRoute from './routes/bookmark'

import {errorController} from './controllers/error'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session'
import 'dotenv/config';
const app = express();
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://www.pethouse.cat", "https://pethouse.cat"]
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));
app.use('/api/v1/user', usersRoute);
app.use('/api/v1/chat', chatRoute);
app.use('/api/v1/post', postRoute);
app.use('/api/v1/pet', petRoute);
app.use('/api/v1/message', messageRoute);
app.use('/api/v1/notification', notificationRoute);
app.use('/api/v1/like', likeRoute);
app.use('/api/v1/missing', missingRoute);
app.use('/api/v1/bookmark', bookmarkRoute);

app.get('/',(req,res) => {
    res.send("Pethouse welcome!")
});
app.use(errorController);

export default app;
