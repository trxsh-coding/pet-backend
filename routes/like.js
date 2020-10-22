import express from 'express'
import {RouteProtect} from "../controllers/user";
import {createLike, deleteLike, getPostLikes} from "../controllers/like";

const router = express.Router();

router
    .route('/:id')
    .get(RouteProtect(true), getPostLikes)
    .post(RouteProtect(true), createLike)
    .delete(RouteProtect(true), deleteLike)

module.exports = router;
