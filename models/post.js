import mongoose from 'mongoose'
const PostSchema = new mongoose.Schema(
    {
        authorId: {
            type:mongoose.Schema.ObjectId,
            ref:'Pet',
            required:true
        },
        content: {
            type:mongoose.Schema.ObjectId,
            ref:'Content'
        },

        description: {
            type:String
        },
        date: {
            type:Date,
            default:Date.now()
        },

    }, {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
);


PostSchema.virtual('comments', {
    ref:'Comment',
    foreignField:'postId',
    localField:'_id'
});



PostSchema.virtual('amountOfLikes', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'postId',
    count:true
});


PostSchema.virtual('bookmark', {
    ref: 'Bookmark',
    localField: '_id',
    foreignField: 'postId',
    select: 'id',
    justOne:true
});
PostSchema.virtual('likeId', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'postId',
    justOne:true,
    default: null
});


PostSchema.virtual('likes', {
    ref: 'Like',
    localField: '_id',
    populate:{
        path:'creatorId',
        select:'username avatar'
    },
    foreignField: 'postId',
});



PostSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'comments',
        populate: { path: 'author' }
    });
    this.populate({
        path:'authorId',
        select:'name id avatar ownerId'
    });
    this.populate({
        path:'amountOfLikes',
    });
    this.populate({
        path:'content',
        select:'publicId contentType contentURL'
    });
    this.populate({
        path: 'likes',
    });
    this.sort('-date')
    next();
});

PostSchema.methods.likeCheck =  function(id){
    console.log(id)
    return id
};

module.exports = mongoose.model('Post', PostSchema);
