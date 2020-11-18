import mongoose from 'mongoose'

const VideoSchema = new mongoose.Schema(
    {
        videoUrl:String,
        publicId:String
    },
    {
        toJSON: {virtuals:true},
        toObject: {virtuals: true}
    }
);

module.exports = mongoose.model('Video', VideoSchema);
