import {catchAsync} from "./error";
import Missing from "../models/missings";
import {sortById} from "../utils/arrayMethods";
import {getOne} from "./generic";

export const createMissing = catchAsync(async (req, res, next) => {
    const images = req.body.contentIdMap || [];
    const newMissing = await Missing.create({
        ...req.body,
        images,
        authorId: req.user._id
    });
    res.status(200).json(newMissing);
})

export const getMissings = catchAsync(async (req, res, next) => {
    const missings = await Missing.find();
    res.status(200).json(sortById(missings));
})
export const getMissing = getOne(Missing)