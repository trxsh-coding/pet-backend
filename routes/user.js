                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             import express from 'express'
import {
    checkStatus, followUser, getAllUsers,
    getCurrentUser, getSubscriptions, getUser,
    RouteProtect,
    signin,
    signup,
    singin, unfollowUser,
    updateCurrentUser, updateUserAvatar, updateUserBackground
} from "../controllers/user";
import {uploadImage} from "../utils/upload";
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/status', RouteProtect(true),  checkStatus);
router.get('/current', RouteProtect(true),  getCurrentUser);
router.patch('/updateCurrentUser', RouteProtect(true), updateCurrentUser);
router.patch('/updateAvatar', RouteProtect(true), uploadImage('avatar'), updateUserAvatar);
router.patch('/updateBackground', RouteProtect(true), uploadImage('background'), updateUserBackground);
router.patch('/updateBackground', RouteProtect(true), uploadImage('background'), updateUserBackground);
router.post('/follow/:id', RouteProtect(true), followUser);
router.delete('/unfollow/:id', RouteProtect(true), unfollowUser);
router.get('/subscriptions', RouteProtect(true), getSubscriptions);


router
    .route('/')
    .get(getAllUsers);

router
    .route('/:id')
    .get(getUser)
module.exports = router;

