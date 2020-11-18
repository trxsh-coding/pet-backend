import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema(
    {
       creatorId: {
           type:mongoose.Schema.ObjectId,
           ref : 'User'
       },
        receiverId: {
            type:mongoose.Schema.ObjectId,
            ref : 'User'
        },
        petId: {
            type:mongoose.Schema.ObjectId,
            ref : 'Pet'
        },
        isRead: {
           type:Boolean,
            default: false
        },
        postId: {
            type:mongoose.Schema.ObjectId,
            ref : 'Post'
        },
        commentId: {
            type:mongoose.Schema.ObjectId,
            ref : 'Comment'
        },
        notificationType: {
            type:mongoose.Schema.ObjectId,
            ref : 'NotificationType'
        },
        message: String,
        creationDate:{
            type:Date,
            default: Date.now()
        },

    },
    {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
);

NotificationSchema.pre(/^find/, function (next) {
    this.populate({
       path: 'creatorId',
       select:'username avatar'
    });
    this.populate({
        path: 'notificationType',
        field:'typeName'
    });
    this.populate({
        path: 'petId',
        select:'name id'
    });
    this.populate({
        path: 'commentId',
        select:'description'
    });
    this.populate({
        path: 'postId',
        select:'content'
    });
    this.sort('-creationDate')
    next();
});


module.exports = mongoose.model('Notification', NotificationSchema);
