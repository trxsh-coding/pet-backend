import {catchAsync} from "./error";
import Bookmark from "../models/bookmark";
import ApiError from "../utils/appError";


export const createBookmark =  catchAsync( async (req, res, next) => {

    const bookmark = await Bookmark.findOne({
        creatorId:req.user._id,
        postId:req.body.postId
    })
    console.log(bookmark, 'bookmark')
    if(bookmark) return next(new ApiError('you already liked this post', 500))

    const newBookmark = await Bookmark.create({
        creatorId:req.user._id,
        postId:req.body.postId
    })

    res.status(200).json(newBookmark)

})

export const deleteBookmark = catchAsync( async (req, res, next) => {

    const bookmark = await Bookmark.findOneAndDelete({
        creatorId:req.user._id,
        postId:req.body.postId
    })

    res.status(200).json(null)

})