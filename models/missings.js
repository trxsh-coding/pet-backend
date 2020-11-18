import mongoose from 'mongoose'

const MissingSchema = new mongoose.Schema(
    {
        title: {
            type:String,
            required:[true, 'Please title'],
            maxlength:[50, 'Title can contain only 10 characters']
        },
        images:[{
            type:mongoose.Schema.ObjectId,
            ref:'Content'
        }],
        reward:String,
        coordinates:[String],
        address:String,
        date:{
            type:Date,
            default:Date.now()
        },
        description: {
            type:String,
            required:[true, 'Please provide description'],
            maxlength:[255, 'Username can contain only 10 characters']
        },

        authorId: {
            type:mongoose.Schema.ObjectId,
            ref:'User',
        },

    },
    {
        toJSON: {virtuals:true},
        toObject: {virtuals: true}
    }
);


MissingSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'authorId',
        select:'username avatar phone email'
    });
    this.populate({
        path: 'images',
        select:'publicId contentType contentURL'
    });
    this.sort('-date')
    next();
});


module.exports = mongoose.model('Missing', MissingSchema);
