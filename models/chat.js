import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema(
    {
        members:[
            {
                user :  {
                    type:mongoose.Schema.ObjectId,
                    ref : 'User'
                },
                delivered : Boolean,
                read : Boolean,
                lastSeen : Date
            }
        ],
        isPrivate:{
            type:Boolean,
            default: true
        },
        chatImage: {
            type:String
        },
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


ChatSchema.virtual('messages', {
    ref:'Message',
    foreignField:'chatId',
    localField:'_id'
});

module.exports = mongoose.model('Chat', ChatSchema);
