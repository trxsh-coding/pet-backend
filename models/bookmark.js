import mongoose from 'mongoose'

const BookmarkSchema = new mongoose.Schema(
    {
        creatorId: {
            type:mongoose.Schema.ObjectId,
            ref:'User'
        },
        postId: {
            type:mongoose.Schema.ObjectId,
            ref:'Post'
        },
    },
    {
        toJSON: {virtuals:true},
        toObject: {virtuals: true}
    }
);

module.exports = mongoose.model('Bookmark', BookmarkSchema);
