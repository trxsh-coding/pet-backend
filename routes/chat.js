import express from 'express'
import {createChat, findChatRoom, getChatByID, getUserChats} from "../controllers/chat";
import {createPost, getAllPosts} from "../controllers/post";
import {RouteProtect} from "../controllers/user";
import {uploadImage} from "../utils/upload";
const router = express.Router();

router.post('/create', RouteProtect(true), createChat);
router
    .route('/')
    .get(RouteProtect(true), getUserChats)
router
    .route('/:id')
    .get(RouteProtect(true), getChatByID)
router
    .route('/findRoom/:id')
    .get(RouteProtect(true), findChatRoom)

module.exports = router;

