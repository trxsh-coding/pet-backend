import {catchAsync} from "./error";
import Post from "../models/post";
import Pet from "../models/pet";

import Comment from "../models/comment";
import {createNotification} from "./notification";
import 'dotenv/config';

import Subscription from "../models/subscriptions";

export const createPost  = catchAsync(async (req, res, next) => {
    const {description, authorId, contentId} = req.body
    const post = await Post.create({
        description:description,
        authorId:authorId,
        content:contentId
    });
    res.status(200).json(post);
});

export const createPostWithVideo  = catchAsync(async (req, res, next) => {
    const video = req.file ? req.file._id : null;
    const {description, authorId} = req.body
    console.log(req.file)
    const doc = await Post.create({
        description:description,
        authorId:authorId,
        video:video
    });
    res.status(200).json('hi');
});


export const createComment  = catchAsync( async (req, res, next) => {
    let doc = await Comment.create({
        author:req.user.id,
        postId:req.body.id,
        description:req.body.description
    })
    const post = await Post.findById(req.body.id)
    const pet = await Pet.findById(post.authorId)

    if(pet.ownerId != req.user.id){

        await createNotification('COMMENTED', {
            creatorId:req.user.id,
            receiverId: pet.ownerId,
            petId:pet.id,
            commentId:doc.id,
            postId:post.id,
            creationDate:Date.now()
        })
    }
    doc = await doc.populate('author').execPopulate()

    res.status(200).json([doc]);
})



export const getPost  = catchAsync( async (req, res, next) => {
    let post = await Post.findById(req.params.id)
    res.status(200).json({
        [post._id]:post,
    });
})


export const getAllPosts  = catchAsync( async (req, res, next) => {
    let posts = await Post.find()
        .populate(
            {path:'likes',
                populate: {
                    path:'creatorId'
            }}
        )
        .exec().then(c => {
            c.map((el, index) => {
                const likeIndex = el.likes.map(item => item.creatorId._id.toString())
                    .indexOf(req.user.id.toString())
                if(likeIndex >= 0) el.set('likeId', el.likes[likeIndex]._id)
            })
            let sortedById = {};
            c.map( el => {
                sortedById = {...sortedById, ...{[el._id] : el }}
            })
            return res.status(200).json(sortedById);
        })


})
