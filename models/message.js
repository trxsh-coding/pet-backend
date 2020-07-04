import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema(
    {
        description: {
            type:String,
            required:[true, 'Please provide your username'],
            maxlength:[500, 'Username can contain only 500 characters']
        },
        picture: {
            type:String
        },
        creationDate:{
            type:Date,
            default: Date.now()
        },
        recieverId: {
            type:mongoose.Schema.ObjectId,
            ref:'User'
        },
        chatId: {
            type:mongoose.Schema.ObjectId,
            ref:'Chat'
        }

    }
);

module.exports = mongoose.model('Message', MessageSchema);
