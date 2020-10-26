import mongoose from 'mongoose'
import bcrypt from "bcrypt";

const PetSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required:[true, 'Please provide pet name'],
            maxlength:[15, 'Username can contain only 10 characters']
        },
        type: {
            type:String,
            required:[true, 'Please provide pet type'],
            maxlength:[15, 'Username can contain only 10 characters']
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
            ref:'Image'
        },

        background: {
            type:mongoose.Schema.ObjectId,
            ref:'Image'
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
        select: 'imageURL'
    });
    this.populate({
        path: 'avatar',
        select: 'imageURL'
    });
    next();
});



module.exports = mongoose.model('Pet', PetSchema);
