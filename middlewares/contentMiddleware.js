import {catchAsync} from "../controllers/error";
import Content from "../models/content";

export const uploadContentMiddleware = catchAsync( async (req, res, next) => {
    const {contentURL, publicId, type} = req.body;
    const newContent = await Content.create({
        contentURL,
        publicId,
        contentType: type
    })
    req.body.contentId = newContent._id;
    next()
})