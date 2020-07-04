import mongoose from 'mongoose'

const SubscriptionsSchema = new mongoose.Schema(
    {
        creatorId: {
            type:mongoose.Schema.ObjectId,
            ref:'User',
        },

        followerId: {
            type:mongoose.Schema.ObjectId,
            ref:'Pet'
        },
    }
);

module.exports = mongoose.model('Subscriptions', SubscriptionsSchema);
