import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema(
    {
        creatorId: {
            type:mongoose.Schema.ObjectId,
            ref:'User',
            unique:true
        },

        chatImage: {
            type:String
        },
        creationDate:{
            type:Date,
            default: Date.now()
        },

    }
);

module.exports = mongoose.model('Message', ChatSchema);
