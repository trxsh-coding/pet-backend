import mongoose from 'mongoose'
import bcrypt from "bcrypt";
const PostSchema = new mongoose.Schema(
    {
        authorId: {
            type:mongoose.Schema.ObjectId,
            ref:'Pet',
            required:true
        },
        picture: {
            type:String,
            required:true
        },
        description: {
            type:String
        },
        date: {
            type:Date,
            default:Date.now()
        },
        likeId: {
            type:String,
            default: null
        }

    }, {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
);

PostSchema.virtual('author', {
    ref:'Pet',
    foreignField:'authorId',
    localField:'_id'
});

PostSchema.virtual('comments', {
    ref:'Comment',
    foreignField:'postId',
    localField:'_id'
});


PostSchema.virtual('amountOfLikes', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'postId',
    count:true
});

PostSchema.virtual('likes', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'postId',
});

PostSchema.virtual('isLiked', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'postId',
    count:true
});

PostSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'comments',
        populate: { path: 'author' }
    });
    this.populate({
        path:'authorId',
        select:'name id avatar ownerId'
    });
    this.populate({
        path:'amountOfLikes',
    });
    this.populate({
        path:'likes',
        populate: {
            path:'creatorId',
            select:'username avatar'
        }
    });


    next();
});

PostSchema.methods.likeCheck =  function(id){
    console.log(id)
    return id
};

module.exports = mongoose.model('Post', PostSchema);
