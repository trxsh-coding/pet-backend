import express from 'express'
import {
    deletePet, getPet,
    protectPet, subscribePet, subscriptionCheck, updatePet
} from "../controllers/pet";
import {createComment, createPost, getAllPosts, getPost} from "../controllers/post";
import {RouteProtect} from "../controllers/user";
import {uploadImage} from "../utils/upload";
import {uploadFile, uploadMiddleware} from "../middlewares/imageMiddleware";
const router = express.Router();

router.post('/comment', RouteProtect(true), createComment);

router
    .route('/')
    .get(RouteProtect(true),getAllPosts)
    .post(
        RouteProtect(true),
        uploadFile('picture'),
        uploadMiddleware,
        createPost
    );
router
    .route('/:id')
    .get(RouteProtect(false),getPost)
module.exports = router;
