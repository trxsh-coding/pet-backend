import mongoose from 'mongoose'

const PetStatusSchema = new mongoose.Schema(
    {
        statusName:String
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




module.exports = mongoose.model('PetStatus', PetStatusSchema);
