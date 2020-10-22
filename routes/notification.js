import {
    createNotificationType,
    getNotificationsCount,
    getUserNotifications,
    readNotifications
} from "../controllers/notification";
import {RouteProtect} from "../controllers/user";
import express from 'express'

const router = express.Router();
router
    .route('/')
    .get(RouteProtect(true), getUserNotifications)

router
    .route('/notificationType')
    .post(RouteProtect(true), createNotificationType)
router
    .route('/count')
    .get(RouteProtect(true), getNotificationsCount)
router
    .route('/read')
    .patch(RouteProtect(true), readNotifications)
module.exports = router;

