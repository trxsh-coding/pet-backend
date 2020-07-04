import express from 'express'
import {
    deletePet, getPet,
    protectPet, subscribePet, subscriptionCheck, updatePet
} from "../controllers/pet";
import {createComment, createPost, getAllPosts, getPost} from "../controllers/post";
import {RouteProtect} from "../controllers/user";
import {uploadImage} from "../utils/upload";
const router = express.Router();

router.post('/comment', RouteProtect(true), createComment);

router
    .route('/')
    .get(getAllPosts)
    .post(RouteProtect(true), uploadImage('picture'),  createPost);
router
    .route('/:id')
    .get(getPost)
module.exports = router;
