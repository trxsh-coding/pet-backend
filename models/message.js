import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema(
    {
        description: {
            type:String,
            required:[true, 'Please provide description'],
            maxlength:[500, 'Username can contain only 500 characters']
        },
        picture: {
            type:String
        },
        creationDate:{
            type:Date,
            default: Date.now()
        },
        receiverId: {
            type:mongoose.Schema.ObjectId,
            ref:'User'
        },
        creatorId: {
            type:mongoose.Schema.ObjectId,
            ref:'User'
        },
        chatId: {
            type:mongoose.Schema.ObjectId,
            ref:'Chat'
        }

    },
    {
        toJSON: {virtuals:true},
        toObject: {virtuals: true}
    }
);

module.exports = mongoose.model('Message', MessageSchema);
