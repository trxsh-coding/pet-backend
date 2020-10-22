import mongoose from 'mongoose'

const NotificationTypeSchema = new mongoose.Schema(
    {
        typeName:String
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




module.exports = mongoose.model('NotificationType', NotificationTypeSchema);
