import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

const UserSchema = new mongoose.Schema(
    {
        username: {
            type:String,
            required:[true, 'Please provide your username'],
            maxlength:[10, 'Username can contain only 10 characters']
        },

        email: {
            type:String,
            required:[true, 'Please provide your email'],
            unique:true,
            validate:[validator.isEmail, 'please provide a valid Email']
        },
        password: {
            type:String,
            required: [true, 'Please provide password'],
            minLength:6
        },
        role: {
            type: String,
            enum:['user', 'guide', 'lead-guide', 'admin'],
            default:'user'
        },

        active: {
            type:Boolean,
            default: true,
            select:false
        },
        online: {
            type:Boolean,
            default:false
        },
        lastSeen: {
            type:Date
        },
        passwordChangedAt:Date,
        passwordResetToken:String,
        passwordResetExpires:Date,
        about: String,
        passwordConfirm: {
            type:String,
            required:[true, 'Please confirm your password'],
            //WORKS ONLY ON SAVE && CREATE
            validate: {
                validator: function (el) {
                    return el === this.password; // 12345 === 12345
                },
                message:'Password are not the same'
            }
        },
        avatar: {
            type:mongoose.Schema.ObjectId,
            ref:'Content'
        },
        background: {
            type:mongoose.Schema.ObjectId,
            ref:'Content'
        },
        phone:String,
        city:String,

    },
    {
        toJSON: {virtuals:true},
        toObject: {virtuals: true}
    }
);

UserSchema.virtual('pets', {
    ref:'Pet',
    foreignField:'ownerId',
    localField:'_id'
});

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;

    next();
});


UserSchema.methods.correctPassword = async function(
    candidatePassword, userPassword
){
    return bcrypt.compare(candidatePassword, userPassword)
};


UserSchema.methods.createPasswordResetToken = function(){

    const resetToken = crypto
        .randomBytes(32)
        .toString('hex')

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
        console.log({resetToken}, this.passwordResetToken)
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

UserSchema.pre(/^find/, function (next){
    this.populate({
        path: 'avatar',
        select: 'contentURL'
    });
    this.populate({
        path: 'background',
        select: 'contentURL'
    });
    next()
})

module.exports = mongoose.model('User', UserSchema);
