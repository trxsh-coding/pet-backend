import {catchAsync} from "./error";
import Post from "../models/post";
import Pet from "../models/pet";

import Comment from "../models/comment";
import {createNotification} from "./notification";
import Subscription from "../models/subscriptions";

export const createPost  = catchAsync(async (req, res, next) => {

    const {description, authorId} = req.body
    const doc = await Post.create({
        description:description,
        authorId:authorId,
        picture:req.file.filename
    });
    res.status(200).json(doc);
});

export const createComment  = catchAsync( async (req, res, next) => {
    let doc = await Comment.create({
        author:req.user.id,
        postId:req.body.id,
        description:req.body.description
    })
    const post = await Post.findById(req.body.id)
    const pet = await Pet.findById(post.authorId)
    if(pet.ownerId !== req.user._id){
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
        .populate('likes')
        .populate('creatorId')
        .exec().then(c => {
            c.map((el, index) => {
                const likeIndex = el.likes.map(item => item.creatorId.toString())
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
