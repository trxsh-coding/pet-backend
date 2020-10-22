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
            type:String,
            default:"pet-avatar.jpg"
        },

        background: {
            type:String,
            default:"background.png"

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
   // this.populate({
   //    path: 'ownerId',
   //    select:'_id username'
   // });
    next();
});



module.exports = mongoose.model('Pet', PetSchema);
