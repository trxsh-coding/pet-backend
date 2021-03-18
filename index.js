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
app.set('trust proxy', '94.228.112.37');


app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://www.pethouse.cat", "https://pethouse.cat"],
    allowedHeaders: [ 'Accept-Version', 'Authorization', 'Credentials', 'Content-Type' ]
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://pethouse.cat");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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
    res.send("Hello Babel")
});


app.use(errorController);



export default app;
