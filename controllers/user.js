import {catchAsync} from "./error";
import User from '../models/user'
import Subscription from '../models/subscriptions'
import Pet from '../models/pet'

import ApiError from "../utils/appError";
import jwt from 'jsonwebtoken'
import {promisify} from 'util'
import {createDocument, getOne, updateDocumentPicture} from "./generic";

const signToken = id => {
    return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES
    });
};

const filterObj = (obj,...allowFields) => {
  const newObject = {};
      Object.keys(obj).forEach( el => {
          if(allowFields.includes(el)) newObject[el]= obj[el]
      });
    return newObject;
};


export const updateUserAvatar = updateDocumentPicture(User, 'avatar');
export const updateUserBackground = updateDocumentPicture(User, 'background');

const checkSubscriptions = async (currentId, id) => {
    // const subscription = await Subscription.findOne({
    //     creatorId:currentId,
    //     followerId: id
    // });
    // return subscription
};

export const RouteProtect = (guard = true) => catchAsync(async (req, res, next) => {
    let token = req.cookies.jwt;

    if(!token) return next(new ApiError('Access! Please login to get access', 401));

    const decoded = await promisify(jwt.verify)(token, process.env.ACCESS_TOKEN_SECRET);

    const enabledUser = await User.findById(decoded.id);

    if(!enabledUser) return next(new ApiError('User is not exists'), 401);

    req.user = enabledUser;

    next()
});

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);
    const cookieOptions =  {
        expires:  new Date(Date.now() + process.env.ACCESS_TOKEN_EXPIRES * 24 * 60 * 1000),
        httpOnly:true,
        sameSite: 'none',
        secure:true
    };
    res.cookie('jwt', token, cookieOptions);

    res.status(statusCode).json({
        [user._id]:user
    })
};

export const signup  = createDocument(User);

export const signin  = catchAsync(async (req, res, next) => {
    const {password, email} = req.body;
    if(!email || !password){
        return next(new ApiError(`please provide email and password`, 400))
    }
    const user = await User.findOne({email});
    if(!user) return next(new ApiError(`Такого юзера нет`, 400))
    const correct = await user.correctPassword(password, user.password);

    if(!correct || !user){
        next(new ApiError('incorrect user or password', 401))
    }

    createSendToken(user, 200, req, res)

});

export const checkStatus = catchAsync( async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if(!user) next(new ApiError('Token is invalid'));

    res.status(200).json({
        status:true
    })

});


export const getCurrentUser = catchAsync( async (req, res, next) => {
    const user = await User.findById(req.user.id).populate('pets');
    res.status(200).json({
        [user._id]:user
    })

});

export const logout = catchAsync( async (req, res, next) => {
    res.clearCookie('jwt');
    res.status(200).json('success')
});


export const getAllUsers = catchAsync( async (req, res, next) => {
    const users = await User.find().populate('pets');
    res.status(200).json({
        users
    })

});




export const getUser = catchAsync(async (req, res, next) => {

    let user = await User.findById(req.params.id).populate('pets');

    if(!user) return next(new ApiError(`No user with ${req.params.id}, ID`, 404));

    // if(subscriptions) user = {...user, subscription:true};

    res.status(200).json({
        [user._id]:user
    })

});


export const followUser = catchAsync( async (req, res, next) => {
    const newSubscription = await Subscription.create({
        creatorId:req.user.id,
        followerId: req.params.id
    });
    res.status(200).json({
        status:'success',
        newSubscription
    });
});

export const unfollowUser = catchAsync( async (req, res, next) => {
    //
    // const subscription = await Subscription.create({
    //     creatorId:req.user.id,
    //     followerId: req.params.id
    // });

    const subscription = await Subscription.findOneAndRemove({
            creatorId:req.user.id,
            followerId: req.params.id
    });
    res.status(200).json({
        status:'success',
        data:null
    });
});

export const getSubscriptions = catchAsync( async (req, res, next) => {

    const subscriptions = await Subscription.find({creatorId:req.user._id})
    const array = subscriptions.map(el =>
        {
            return el.followerId
        }
    )
    const subs = await  Pet.find({_id: {$in:array}})
    let sortedById = {};
    subs.map( el => {
         sortedById = {...sortedById, ...{[el._id] : el }}
    })
    res.status(200).json({
        subscriptions:sortedById,
        items:array
    })

});

export const updateCurrentUser = catchAsync( async (req, res, next) => {
    console.log(req.body)
    if(req.body.password || req.body.passwordConfirm){

        next(new ApiError(
            'This route is not for password changing', 400
        ))

    }
    const filteredBody = filterObj(req.body, 'username', 'city', 'phone', 'about');
    const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new:true,
        runValidators:true
    });
    res.status(200).json({
        [user.id]:user
    })


});

const getUserById = getOne(User, 'pets')