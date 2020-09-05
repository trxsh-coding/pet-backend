import mongoose from 'mongoose'
import UserSchema from './user'
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


module.exports = mongoose.model('Post', PostSchema);
