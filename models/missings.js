import mongoose from 'mongoose'

const MissingSchema = new mongoose.Schema(
    {
        title: {
            type:String,
            required:[true, 'Необходимо ввести заголовок'],
            maxlength:[100, 'Заголовок не может привышать 100 символов']
        },
        images:[{
            type:mongoose.Schema.ObjectId,
            ref:'Content',
            required:true,
        }],
        reward: {
            type:String,
            required:[true, 'Необходимо ввести вознаграждение'],
        },
        coordinates:{
            type:[String],
            validate: {
                validator : (v) => Array.isArray(v) && v.length > 0,
                message:'Необходимо ввести локацию'
            }
        },
        address:{
            type:String,
            required:[true, 'Необходимо ввести заголовок'],
        },
        date:{
            type:Date,
            default:Date.now()
        },
        description: {
            type:String,
            required:[true, 'Необходимо ввести описание'],
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
