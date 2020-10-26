import express from 'express'
import {
    createPet,
    deletePet,
    getAllPets,
    getPet, getPetFeed,
    getUserPets,
    protectPet, searchPetsByQuery, subscribePet, subscriptionCheck, unsubscribePet,
    updatePet,
    updatePetAvatar, updatePetBackground
} from "../controllers/pet";
import {checkStatus, followUser, RouteProtect, updateUserAvatar, updateUserBackground} from "../controllers/user";
import {uploadImage} from "../utils/upload";
import {uploadFile, uploadMiddleware} from "../middlewares/imageMiddleware";
const router = express.Router();


router.get('/getUserPets/:id',  getUserPets);

//MAIN ROUTES
router.post('/follow/:id', RouteProtect(true), subscribePet);
router.get('/feed/:id', getPetFeed);
router.delete('/unfollow/:id', RouteProtect(true), unsubscribePet);
router.patch(
    '/updateAvatar',
    RouteProtect(true),
    uploadFile('avatar'),
    uploadMiddleware,
    updatePetAvatar
);
router.patch(
    '/updateBackground',
    RouteProtect(true),
    uploadFile('background'),
    uploadMiddleware,
    updatePetBackground
);

router
    .route('/')
    .get(getAllPets)
    .post(
        RouteProtect(true),
        uploadFile('avatar'),
        uploadMiddleware,
        createPet
    );
router
    .route('/search')
    .get(searchPetsByQuery)
router
    .route('/:id')
    .delete(deletePet)
    .get(RouteProtect(true), subscriptionCheck, getPet)
    .patch(RouteProtect(true),   updatePet);
module.exports = router;
