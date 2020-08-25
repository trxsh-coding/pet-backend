import {catchAsync} from "./error";
import Post from "../models/post";
import Comment from "../models/comment";

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

    doc = await doc.populate('author').execPopulate()

    res.status(200).json([doc]);
})

export const getPost  = catchAsync( async (req, res, next) => {
    let post =  Post.findById(req.params.id)
    post =  await post
        .populate([
            {
                path: 'comments',
                populate: { path: 'author' }
            },
            {
                path:'authorId',
                select:'name id avatar'
            }
        ]);

    res.status(200).json({
        [post._id]:post,
    });
})

const postDefaultPopultaion = fn => {
fn.populate([
        {
            path: 'comments',
            populate: { path: 'author' }
        },
        {
            path:'authorId',
            select:'name id avatar'
        }
    ]);
}

export const getAllPosts  = catchAsync( async (req, res, next) => {
    let posts =  Post.find()
    posts =  await posts.populate([
        {
            path: 'comments',
            populate: { path: 'author' }
        },
        {
            path:'authorId',
            select:'name id avatar'
        }
    ]);

    let sortedById = {};
    posts.map( el => {
        sortedById = {...sortedById, ...{[el._id] : el }}
    })
    res.status(200).json(sortedById);
})