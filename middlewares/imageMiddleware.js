import multer from 'multer';
import 'dotenv/config';
import cd from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import Image from '../models/image'
import {catchAsync} from "../controllers/error";
import Content from "../models/content";
import ApiError from "../utils/appError";

const cloudinary = cd.v2
cloudinary.config({
    cloud_name: process.env.IMAGE_NAME,
    api_key: process.env.IMAGE_API_KEY,
    api_secret: process.env.IMAGE_API_SECRET
});



const storage = cloudinaryStorage({
    cloudinary:cloudinary,
    folder: "petsn_images",
    allowedFormats: ["jpg", "png"],
});

export const parser = multer({ storage: storage });
export const uploadFile = name => parser.single(name)
export const uploadFiles= count => parser.fields([
    {
        name:'images',
        maxCount: count,
    }
])
export const uploadMiddleware = catchAsync( async (req, res, next) => {
   if(req.file){
       const newContent = await Content.create({
           contentURL:req.file.path,
           publicId:req.file.filename,
           contentType: 'image'
       })
       req.body.contentId = newContent._id;
   }
    next()
})
export const uploadMultipleMiddleware = catchAsync( async (req, res, next) => {
    if(!req.files.images) next(new ApiError('errors', 505, {images:'Необходимо загрузить фотографии'}))
    const arrayMap =  req.files.images.map( el => {
        return {
            contentURL:el.path,
            publicId:el.filename,
            contentType: 'image'
        }
    })
    const contents = await Content.create(arrayMap)
    req.body.contentIdMap = contents.map(el => el.id)
    next()
})