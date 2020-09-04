import express from 'express';
import bodyParser from 'body-parser';
import usersRoute from './routes/user'
import chatRoute from './routes/chat'
import petRoute from './routes/pet'
import postRoute from './routes/post'
import messageRoute from './routes/message'

import {errorController} from './controllers/error'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({origin: ['http://localhost:3000', 'http://localhost:3001'], credentials: true}));
app.use(express.static(`${__dirname}/public`));


app.use('/api/v1/user', usersRoute);
app.use('/api/v1/chat', chatRoute);
app.use('/api/v1/post', postRoute);
app.use('/api/v1/pet', petRoute);
app.use('/api/v1/message', messageRoute);
app.enable('trust proxy');
app.use(express.session({
    secret : 'trxsh',
    key : 'sid',
    proxy : true, // add this when behind a reverse proxy, if you need secure cookies
    cookie : {
        secure : true,
        maxAge: 5184000000 // 2 months
    }
}));
app.get('/',(req,res) => {
    res.send("Hello Babel")
});
app.use(errorController);

export default app;
