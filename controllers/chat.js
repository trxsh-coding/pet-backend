import {catchAsync} from "./error";
import ApiError from "../utils/appError";
import User from "../models/user";

export const createChat  = catchAsync(async (req, res, next) => {
    const {creatorId, chatImage} = req.body;
    const newUser = await User.create();
});
export const signup  = catchAsync(async (req, res, next) => {


    res.status(200).json({
        status:'success',
        data:newUser
    })
});
