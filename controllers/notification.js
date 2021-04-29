import {catchAsync} from "./error";
import NotificationType from "../models/notificationType";
import Notification from "../models/notification";

export const createNotificationType = catchAsync( async (req, res, next) => {

    const notificationType = await NotificationType.create(req.body);
    res.status(200).json(notificationType);
})

export const createNotification = async (type, body) => {
    const notificationType = await NotificationType.findOne({typeName:type})
    const notification = await  Notification.create({
        ...body,
        notificationType:notificationType.id
    })
}

export const getUserNotifications =  catchAsync( async (req, res, next) => {
    console.log(req.user)
    const notifications = await Notification.find({
        receiverId:req.user._id
    })
    res.status(200).json(notifications);
})

export const getNotificationsCount =  catchAsync( async (req, res, next) => {
    const notifications = await Notification.find({
        receiverId:req.user._id,
        isRead:false
    })
    res.status(200).json(notifications.length);
})

export const readNotifications =  catchAsync( async (req, res, next) => {
    const notifications = await Notification.updateMany({
        receiverId:req.user._id,
    },{isRead:true})
    res.status(200).json('success');
})