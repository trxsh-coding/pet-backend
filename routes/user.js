                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             import express from 'express'
import {
    checkStatus, followUser, forgotPassword, getAllUsers,
    getCurrentUser, getSubscriptions, getUser, logout, resetPassword,
    RouteProtect,
    signin,
    signup,
    singin, unfollowUser,
    updateCurrentUser, updateUserAvatar, updateUserBackground
} from "../controllers/user";
import {uploadImage} from "../utils/upload";
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             import {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 parser,
    uploadFile,
    uploadMiddleware
} from "../middlewares/imageMiddleware";
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.get('/status', RouteProtect(true),  checkStatus);
router.get('/current', RouteProtect(true),  getCurrentUser);
router.patch('/updateCurrentUser', RouteProtect(true), updateCurrentUser);
router.patch(
    '/updateAvatar',
    RouteProtect(true),
    uploadFile('avatar'),
    uploadMiddleware,
    updateUserAvatar
);
router.patch(
    '/updateBackground',
    RouteProtect(true),
    uploadFile('background'),
    uploadMiddleware,
    updateUserBackground
);
router.post('/follow/:id', RouteProtect(true), followUser);
router.delete('/unfollow/:id', RouteProtect(true), unfollowUser);
router.get('/subscriptions', RouteProtect(true), getSubscriptions);
router.get('/logout', RouteProtect(true), logout);


router
    .route('/')
    .get(getAllUsers);

router
    .route('/:id')
    .get(getUser)
module.exports = router;

