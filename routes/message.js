import express from 'express'
import {createChat} from "../controllers/chat";
import {RouteProtect} from "../controllers/user";
import {createMessage, createMessageWithRoom} from "../controllers/message";
const router = express.Router();

router
    .route('/room')
    .post(RouteProtect(true), createMessageWithRoom)
router
    .route('/')
    .post(RouteProtect(true), createMessage)
module.exports = router;

