import {catchAsync} from "./error";
import Message from "../models/message";
import Chat from "../models/chat";
import {createChat} from "./chat";
import {clients} from "../server";

export const createMessageWithRoom = catchAsync( async (req, res, next) => {
    let {chatId, description, receiverId} = req.body;
    const creatorId = req.user._id;
    if(!chatId) {
        let chat = await Chat.find()
            .where({'members.user':creatorId})
            .where({'members.user':receiverId})
        if(!chat.length){
             chat = await Chat.create({
                creatorId,
                members:[
                    {
                        user:creatorId,
                    },
                    {
                        user:receiverId
                    }
                ]
            })
            chatId = chat._id
        } else {
            chatId = chat[0]._id
        }

        let message =  await Message.create({
            chatId,
            receiverId,
            creatorId,
            description
        })

        res.status(200).json(message)

    }


})

export const createMessage = catchAsync( async (req, res, next) => {
    let {chatId, description, receiverId} = req.body;
    const creatorId = req.user._id;
    const socket = req.app.get('socket')
    const io = req.app.get('io')
    const message =  await Message.create({
        chatId,
        receiverId,
        creatorId,
        description
    })
    const receiver = clients.get(receiverId);
    console.log(receiver)
    if(receiver) {
        io.to(receiver['socketID']).emit('get-message', message);
        console.log(receiver, message)
    }
    res.status(200).json(message)

})



