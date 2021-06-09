import {catchAsync} from "./error";
import Pet from "../models/pet";
import {deleteDocument, getOne, updateDocumentPicture, updateOne} from "./generic";
import ApiError from "../utils/appError";
import Subscription from "../models/subscriptions";
import Post from "../models/post";
import PetStatus from "../models/petStatus";

import {getMapId, sortById} from "../utils/arrayMethods";
import {createNotification} from "./notification";

export const protectPet = catchAsync(async (req, res, next) => {
    if (!req.user._id) next(new ApiError('you are not logged in to do anything', 500));
    if (req.body.ownerId !== req.user.id) next(new ApiError('you are not allowed to do it'))
    next();
});


export const updatePet = updateOne(Pet);
export const deletePet = deleteDocument(Pet);

export const getPet = catchAsync(async (req, res, next) => {
    let pet = await Pet.findById(req.params.id)
        .populate({path: 'follower', match: {creatorId: req.user?.id}})
    res.status(200).json({
        [pet._id]: pet,
    });

});
export const createPet = catchAsync(async (req, res, next) => {
    const avatar = req.body.contentId ? req.body.contentId : null
    const pet = await Pet.create({
        ...req.body,
        avatar,
        ownerId: req.user._id,
    });
    res.status(200).json({[pet._id]: pet});
});
export const updatePetAvatar = catchAsync(async (req, res, next) => {
    await Pet.findById(req.body.id, (err, pet) =>{
        pet.ownerId = req.user.id
        pet.avatar = req.body.contentId;
        pet.save();
    });

    res.status(200).json(req.file.path);

});
export const updatePetBackground = updateDocumentPicture(Pet, 'background');
export const getUserPets = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const pets = await Pet.find({ownerId: id});
    res.status(200).json({
        status: 'success',
        data: pets
    })
});export const petStatusCreate = catchAsync(async (req, res, next) => {
    const status = await PetStatus.create({statusName:req.body.statusName});
    res.status(200).json(status)
});

export const searchPetsByQuery = catchAsync(async (req, res, next) => {
    const keyName = Object.keys(req.query)[0];
    const pets = await Pet.find({[keyName]: {$regex: `${req.query[keyName]}`, $options: 'i'}})
    res.status(200).json(
        {
            pets: sortById(pets),
            items: getMapId(pets)
        }
    )
});


export const getAllPets = catchAsync(async (req, res, next) => {
    const pets = await Pet.find();
    res.status(200).json({
        status: 'success',
        data: pets
    })
});


export const subscribePet = catchAsync(async (req, res, next) => {
    const pet = await Pet.findById(req.params.id)
    if (pet.ownerId === req.user.id) next(new ApiError('you cant sub yourself', 500))

    const subscription = await Subscription.findOne({
        creatorId: req.user.id,
        followerId: req.params.id
    })
    console.log(subscription)
    if (subscription) next(new ApiError('you already subscribed', 500))

    const newSubscription = await Subscription.create({
        creatorId: req.user.id,
        followerId: req.params.id
    });
    await createNotification('SUBSCRIBED', {
        creatorId: req.user.id,
        receiverId: pet.ownerId,
        petId: req.params.id,
        creationDate: Date.now()
    })
    res.status(200).json(newSubscription)

});


export const unsubscribePet = catchAsync(async (req, res, next) => {
    const newSubscription = await Subscription.findOneAndDelete({
        creatorId: req.user.id,
        followerId: req.params.id
    });
    res.status(200).json('success')

});


export const getPetFeed = catchAsync(async (req, res, next) => {
    const feed = await Post.find({
        authorId: req.params.id
    }).sort('date').populate({
        path: 'comments',
        populate: {path: 'author'}
    });
    const array = feed.map(el => {
            return el._id
        }
    )
    let sortedById = {};
    feed.map(el => {
        sortedById = {...sortedById, ...{[el._id]: el}}
    })
    res.status(200).json({
        feed: sortedById,
        items: array
    })
});
