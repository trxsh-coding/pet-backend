import express from 'express'
import {
    createPet,
    deletePet,
    getAllPets,
    getPet, getPetFeed,
    getUserPets,
    protectPet, subscribePet, subscriptionCheck, unsubscribePet,
    updatePet,
    updatePetAvatar, updatePetBackground
} from "../controllers/pet";
import {checkStatus, followUser, RouteProtect, updateUserAvatar, updateUserBackground} from "../controllers/user";
import {uploadImage} from "../utils/upload";
const router = express.Router();


router.get('/getUserPets/:id',  getUserPets);

//MAIN ROUTES
router.post('/follow/:id', RouteProtect(true), subscribePet);
router.get('/feed/:id', getPetFeed);
router.delete('/unfollow/:id', RouteProtect(true), unsubscribePet);
router.patch('/updateAvatar', RouteProtect(true), uploadImage('avatar'), updatePetAvatar);
router.patch('/updateBackground', RouteProtect(true), uploadImage('background'), updatePetBackground);

router
    .route('/')
    .get(getAllPets)
    .post(RouteProtect(true), protectPet, createPet);
router
    .route('/:id')
    .delete(deletePet)
    .get(RouteProtect(true), subscriptionCheck, getPet)
    .patch(protectPet, updatePet);
module.exports = router;
