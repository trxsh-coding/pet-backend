import {catchAsync} from "./error";
import Message from "../models/message";
import Chat from "../models/chat";
import {createChat} from "./chat";

export const sendMessage = catchAsync( async (req, res, next) => {
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



