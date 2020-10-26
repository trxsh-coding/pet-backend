import multer from 'multer';
import 'dotenv/config';
import cd from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import Image from '../models/image'
import {catchAsync} from "../controllers/error";

const cloudinary = cd.v2
cloudinary.config({
    cloud_name: process.env.IMAGE_NAME,
    api_key: process.env.IMAGE_API_KEY,
    api_secret: process.env.IMAGE_API_SECRET
});



const storage =  cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "images",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
});

export const parser = multer({ storage: storage });
export const uploadFile = name => parser.single(name)
export const uploadMiddleware = catchAsync( async (req, res, next) => {
    const newImage = await Image.create({
        imageURL:req.file.path
    })
    req.file._id = newImage._id;
    next()
})