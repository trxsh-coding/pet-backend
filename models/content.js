import mongoose from 'mongoose'

const ContentSchema = new mongoose.Schema(
    {
        contentURL:String,
        publicId:String,
        contentType:String
    },
    {
        toJSON: {virtuals:true},
        toObject: {virtuals: true}
    }
);

module.exports = mongoose.model('Content', ContentSchema);
