import mongoose from 'mongoose'

const ImageSchema = new mongoose.Schema(
    {
       imageURL:String,
       publicId:String,
       type:String
    },
    {
        toJSON: {virtuals:true},
        toObject: {virtuals: true}
    }
);

module.exports = mongoose.model('Image', ImageSchema);
