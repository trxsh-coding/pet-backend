import {catchAsync} from "./error";
import ApiError from "../utils/appError";
import Chat from "../models/chat";

export const createChat  = catchAsync( async (req, res, next) => {

    let chat = Chat.create({
        creatorId:req.user._id,
        members:[
            {
                user:req.user._id,
            },
            {
                user:req.body.receiverId
            }
        ]
    })

    chat = await chat.populate([
        {
            path: 'members',
            populate: { path: 'user', select:'id avatar username' },
        },
    ]);

    res.status(200).json(chat)
})


export const findChatRoom = catchAsync( async (req, res, next) => {
    let chat =  await Chat.find()
        .where({'members.user':req.user.id})
        .where({'members.user':req.params.id})
    console.log(chat)
    if(!chat.length) return res.status(200).json('chat not created yet')
    // chat = await chat.populate([
    //     {
    //         path: 'members',
    //         populate: { path: 'user', select:'id avatar username' },
    //     }
    // ]);
    res.status(200).json(chat[0])
})


export const getUserChats  = catchAsync( async (req, res, next) => {
    let chats =  Chat.find()
        .where({'members.user':req.user._id})
    chats = await chats
        .populate('messages')
        .populate([
        {
            path: 'members',
            populate: { path: 'user', select:'id avatar username' },
        }
    ]);
    let sortedById = {};
    chats.map( el => {
        sortedById = {...sortedById, ...{[el._id] : el }}
    })
    res.status(200).json(sortedById)
})

export const getChatByID  = catchAsync( async (req, res, next) => {
    let chat =  Chat.findById(req.params.id)
    chat = await chat
        .populate('messages')
        .populate([
            {
                path: 'members',
                populate: { path: 'user', populate:{path:'pets'} },
            }
        ]);
    res.status(200).json({
        [chat._id] : chat
    })
})
