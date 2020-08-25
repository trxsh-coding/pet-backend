import express from 'express'
import {createChat} from "../controllers/chat";
import {RouteProtect} from "../controllers/user";
import {sendMessage} from "../controllers/message";
const router = express.Router();

router
    .route('/')
    .post(RouteProtect(true), sendMessage)

module.exports = router;

