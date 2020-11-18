import {catchAsync} from "./error";
import Like from "../models/like"
import Post from "../models/post"
import ApiError from "../utils/appError";
import {createNotification} from "./notification";


export const createLike =  catchAsync( async (req, res, next) => {
    const like = await Like.findOne({
        creatorId:req.user._id,
        postId:req.params.id
    })
    if(like) return next(new ApiError('you already liked this post', 500))

    const newLike = await Like.create({
        creatorId:req.user._id,
        postId:req.params.id
    })
    console.log(newLike)
    const post = await Post.findById(req.params.id)


    await createNotification('LIKED', {
        creatorId:req.user.id,
        receiverId: req.body.ownerId,
        petId:req.body.petId,
        postId:req.params.id,
        creationDate:Date.now()
    })


    res.status(200).json(newLike)

})

export const deleteLike =  catchAsync( async (req, res, next) => {
    const newLike = await Like.findByIdAndDelete(req.params.id)
    res.status(200).json('success')

})

export const getPostLikes =  catchAsync( async (req, res, next) => {

    const likes = await Like.find({
        postId:req.params._id
    })

    res.status(200).json(likes)

})