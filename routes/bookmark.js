import {RouteProtect} from "../controllers/user";
import {createBookmark, deleteBookmark} from "../controllers/bookmarks";
import express from "express";


const router = express.Router();

router
    .route('/')
    .post(RouteProtect(true), createBookmark)
    .delete(RouteProtect(true), deleteBookmark)
module.exports = router;
