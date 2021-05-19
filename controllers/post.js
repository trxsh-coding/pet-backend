import {catchAsync} from "./error";
import Post from "../models/post";
import Pet from "../models/pet";
import Bookmark from "../models/bookmark";
import Comment from "../models/comment";
import {createNotification} from "./notification";
import 'dotenv/config';
import {deleteDocument} from "./generic";


export const createPost = catchAsync(async (req, res, next) => {
    const {description, authorId, contentId} = req.body
    const post = await Post.create({
        description: description,
        authorId: authorId,
        content: contentId
    });
    res.status(200).json(post);
});

export const deletePost = deleteDocument(Post);


export const createPostWithVideo = catchAsync(async (req, res, next) => {
    const video = req.file ? req.file._id : null;
    const {description, authorId} = req.body
    console.log(req.file)
    const doc = await Post.create({
        description: description,
        authorId: authorId,
        video: video
    });
    res.status(200).json('hi');
});


export const createComment = catchAsync(async (req, res, next) => {
    let doc = await Comment.create({
        author: req.user.id,
        postId: req.body.id,
        description: req.body.description
    })
    const post = await Post.findById(req.body.id)
    const pet = await Pet.findById(post.authorId)

    if (pet.ownerId != req.user.id) {

        await createNotification('COMMENTED', {
            creatorId: req.user.id,
            receiverId: pet.ownerId,
            petId: pet.id,
            commentId: doc.id,
            postId: post.id,
            creationDate: Date.now()
        })
    }
    doc = await doc.populate('author').execPopulate()

    res.status(200).json([doc]);
})


export const getPost = catchAsync(async (req, res, next) => {
    const {user} = req;
    let post = await Post.findById(req.params.id)
        .populate({path: 'likeId', match: {creatorId: req.user?.id}})
        .populate({path: 'bookmark', match: {creatorId: req.user?.id}})
    res.status(200).json({
        [post._id]: post,
    });

})

export const getBookmarkedPosts = catchAsync(async (req, res, next) => {

    const bookmarks = await Bookmark.find({creatorId: req.user._id})

    const array = bookmarks.map(el => el.postId)

    const posts = await Post.find({_id: {$in: array}})
    let sortedById = {};
    posts.map(el => {
        sortedById = {...sortedById, ...{[el._id]: el}}
    })
    res.status(200).json({
        posts: sortedById,
        items: array
    })
})


export const getAllPosts = catchAsync(async (req, res, next) => {
    let posts = await Post.find({})
        .populate(
            {
                path: 'likes',
                populate: {
                    path: 'creatorId'
                }
            }
        )
        .sort('date')

    let sortedById = {};
    posts.map(el => {
        sortedById = {...sortedById, ...{[el._id]: el}}
    })
    res.status(200).json(sortedById)
})
