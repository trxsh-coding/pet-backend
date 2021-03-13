import mongoose from 'mongoose'

const SettingsSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Chat'
        },
        city: Boolean,
        phone: Boolean,
        mail: Boolean,
        messages: Boolean,
        followers: Boolean,
        likes: Boolean,
        reposts: Boolean,
        comments: Boolean,
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
);

module.exports = mongoose.model('Settings', SettingsSchema);
