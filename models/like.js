import mongoose from 'mongoose'

const LikeSchema = new mongoose.Schema(
    {
        postId: {
            type:mongoose.Schema.ObjectId,
            ref:'User'
        },
        creatorId: {
            type:mongoose.Schema.ObjectId,
            ref:'User'
        },

    },
    {
        toJSON: {virtuals:true},
        toObject: {virtuals: true}
    }
);

module.exports = mongoose.model('Like', LikeSchema);
