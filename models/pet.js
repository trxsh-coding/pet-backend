import mongoose from 'mongoose'
import bcrypt from "bcrypt";

const PetSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required:[true, 'Впишите имя питомца'],
            maxlength:[20, 'Имя не должно привышать 20  симоволов']
        },
        type: {
            type:String,
        },
        amountOfFollowers: {
            type:Number,
            default:0
        },
        gender: {
            type:String
        },
        ages: {
            type:String
        },
        breed: {
            type:String
        },
        ownerId: {
            type:mongoose.Schema.ObjectId,
            ref:'User',
        },
        avatar: {
            type:mongoose.Schema.ObjectId,
            ref:'Content'
        },

        background: {
            type:mongoose.Schema.ObjectId,
            ref:'Content'
        },
        followee:{
            type:Boolean,
            default:false
        }
    },
    {
        toJSON: {virtuals:true},
        toObject: {virtuals: true}
    }
);

PetSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'background',
        select: 'contentURL'
    });
    this.populate({
        path: 'avatar',
        select: 'contentURL'
    });
    next();
});



module.exports = mongoose.model('Pet', PetSchema);
