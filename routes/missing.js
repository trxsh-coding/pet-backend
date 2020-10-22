import express from 'express'
import {RouteProtect} from "../controllers/user";
import {createMissing, getMissing, getMissings} from "../controllers/missings";
import {uploadImages} from "../utils/upload";
const router = express.Router();


router
    .route('/')
    .get(getMissings)
    .post(RouteProtect(true), uploadImages(4),createMissing)
router
    .route('/:id')
    .get(getMissing)
module.exports = router;

