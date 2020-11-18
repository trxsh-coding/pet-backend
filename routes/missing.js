import express from 'express'
import {RouteProtect} from "../controllers/user";
import {createMissing, getMissing, getMissings} from "../controllers/missings";
import {uploadImages} from "../utils/upload";
import {uploadFile, uploadFiles, uploadMiddleware, uploadMultipleMiddleware} from "../middlewares/imageMiddleware";
const router = express.Router();


router
    .route('/')
    .get(getMissings)
    .post(
        RouteProtect(true),
        uploadFiles(4),
        uploadMultipleMiddleware,
        createMissing
    )
router
    .route('/:id')
    .get(getMissing)
module.exports = router;

