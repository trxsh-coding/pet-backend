import express from 'express'
import {createChat} from "../controllers/chat";
const router = express.Router();

router.post('/create', createChat);


module.exports = router;

