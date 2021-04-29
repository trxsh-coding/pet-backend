import mongoose from 'mongoose'
import bcrypt from "bcrypt";

const PetSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Впишите имя питомца'],
            maxlength: [20, 'Имя не должно привышать 20  симоволов']
        },
        type: {
            type: String,
        },

        gender: {
            type: String
        },
        ages: {
            type: String
        },
        breed: {
            type: String
        },
        ownerId: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
        avatar: {
            type: mongoose.Schema.ObjectId,
            ref: 'Content'
        },

        background: {
            type: mongoose.Schema.ObjectId,
            ref: 'Content'
        },
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
);


PetSchema.virtual('amountOfFollowers', {
    ref: 'Subscriptions',
    localField: '_id',
    foreignField: 'followerId',
    count: true
});

PetSchema.virtual('follower', {
    ref: 'Subscriptions',
    localField: '_id',
    foreignField: 'followerId',
    justOne:true,
    default: null
});

PetSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'background',
        select: 'contentURL'
    });
    this.populate({
        path: 'avatar',
        select: 'contentURL'
    });
    this.populate({
        path: 'amountOfFollowers',
    });
    next();
});


module.exports = mongoose.model('Pet', PetSchema);
