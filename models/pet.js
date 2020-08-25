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
        gender: {
            type:String
        },
        ages: {
            type:Number
        },
        ownerId: {
            type:mongoose.Schema.ObjectId,
            ref:'User',
        },
        avatar: {
            type:String,
            default:"avatar.png"
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

// PetSchema.methods.subscriptionCheck = async function(
//     candidatePassword, userPassword
// ){
//     return bcrypt.compare(candidatePassword, userPassword)
// };


PetSchema.pre(/^find/, function (next) {
   // this.populate({
   //    path: 'ownerId',
   //    select:'_id username'
   // });
    next();
});


// PetSchema.virtual('followee', {
//     ref: 'Subscriptions',
//     localField: 'followee',
//     foreignField: 'subscriptionId',
// });


// PetSchema.pre('save', function (next, req, callback) {
//     console.log(req)
//     next()
// })

module.exports = mongoose.model('Pet', PetSchema);
