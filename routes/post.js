import express from 'express'
import {createComment, createPost, deletePost, getAllPosts, getBookmarkedPosts, getPost} from "../controllers/post";
import {RouteProtect} from "../controllers/user";
import {uploadFile, uploadMiddleware} from "../middlewares/imageMiddleware";
import {uploadContentMiddleware} from "../middlewares/contentMiddleware";

const router = express.Router();

router.post('/comment', RouteProtect(true), createComment);
router.get('/getBookmarkedPosts', RouteProtect(true), getBookmarkedPosts)
router
    .route('/')
    .get(getAllPosts)
    .post(
        RouteProtect(true),
        uploadFile('file'),
        uploadMiddleware,
        createPost
    );
router
    .route('/video')
    .post(
        RouteProtect(true),
        uploadContentMiddleware,
        createPost
    );
router
    .route('/:id')
    .get(RouteProtect(false), getPost)
    .delete(RouteProtect(true), deletePost)
module.exports = router;
