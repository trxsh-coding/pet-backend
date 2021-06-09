import {catchAsync} from "./error";
import Message from "../models/message";
import Chat from "../models/chat";
import {clients} from "../server";

export const createMessageWithRoom = catchAsync(async (req, res, next) => {
    let {chatId, description, receiverId} = req.body;
    const creatorId = req.user._id;

    console.log('chatId', chatId)
    console.log('receiverId', receiverId)

    if (!chatId) {
        let chat = await Chat.findOne({
            "members.user": {$all: [receiverId, req.user.id]}
        })
        if (!chat) {
            chat = await Chat.create({
                creatorId,
                members: [
                    {
                        user: creatorId,
                    },
                    {
                        user: receiverId
                    }
                ]
            })
            chatId = chat._id
        } else {
            chatId = chat[0]._id
        }

        let message = await Message.create({
            chatId,
            receiverId,
            creatorId,
            description
        })

        res.status(200).json(message)

    }


})

export const createMessage = catchAsync(async (req, res, next) => {
    let {chatId, description, receiverId} = req.body;
    const creatorId = req.user._id;
    const socket = req.app.get('socket')
    const io = req.app.get('io')
    const message = await Message.create({
        chatId,
        receiverId,
        creatorId,
        description
    })
    const receiver = clients.get(receiverId);
    console.log('receiver', receiver)
    if (receiver) socket.to(receiver.socketID).emit('get-message', message);
    res.status(200).json(message)

})



