import {catchAsync} from "./error";
import ApiError from "../utils/appError";
import Chat from "../models/chat";

export const createChat = catchAsync(async (req, res, next) => {

    let chat = Chat.create({
        creatorId: req.user._id,
        members: [
            {
                user: req.user._id,
            },
            {
                user: req.body.receiverId
            }
        ]
    })

    chat = await chat.populate([
        {
            path: 'members',
            populate: {path: 'user', select: 'id avatar username'},
        },
    ]);

    res.status(200).json(chat)
})


export const findChatRoom = catchAsync(async (req, res, next) => {
    try {
        console.log( req.params.id)
        console.log( req.user.id)

        let chat = await Chat.findOne({
            "members.user": {$all: [req.params.id, req.user.id]}
        })
        if (!chat) return res.status(200).json('chat not created yet')
        res.status(200).json(chat)
    }catch (e){
        console.trace(e)
    }
})


export const getUserChats = catchAsync(async (req, res, next) => {
    let chats = Chat.find()
        .where({'members.user': req.user._id})
    chats = await chats
        .populate('messages')
        .populate([
            {
                path: 'members',
                populate: {path: 'user', select: 'id avatar username lastSeen'},
            }
        ]);
    let sortedById = {};
    chats.map(el => {
        sortedById = {...sortedById, ...{[el._id]: el}}
    })
    res.status(200).json(sortedById)
})

export const getChatByID = catchAsync(async (req, res, next) => {
    let chat = Chat.findById(req.params.id)
    chat = await chat
        .populate('messages')
        .populate([
            {
                path: 'members',
                populate: {path: 'user', populate: {path: 'pets'}},
            }
        ]);
    res.status(200).json({
        [chat._id]: chat
    })
})
