import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema(
    {
        author: {
            type:mongoose.Schema.ObjectId,
            ref:'User',
        },
        postId: {
            type:mongoose.Schema.ObjectId,
            ref:'Post',
        },
        description: {
            type:String,
            required:[true, 'Пожалуйста введите описание'],
            maxlength:[255, 'Комментарий может содержать не более 255 символов']
        },
        date: {
            type:Date,
            default:Date.now()
        }
    },
    {
        toJSON: {virtuals:true},
        toObject: {virtuals: true}
    }
);
module.exports = mongoose.model('Comment', CommentSchema);
