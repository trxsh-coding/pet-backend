import {catchAsync} from "./error";
import ApiError from "../utils/appError";
import User from "../models/user";


export const deleteDocument = Model =>
    catchAsync(async (req, res, next) => {

        const doc = await Model.findOneAndDelete(req.params.id);

        if(!doc) return next(new ApiError(`No document found with ${req.params.id}`, 404));

        res.status(204).json({
            status:'success',
            data:null
        })

    });

export const createDocument = (Model, Options) =>
    catchAsync(async (req, res, next) => {
        const query =  Model.create(req.body);
        if(Options) query.populate(Options)
        const doc = await query;
        res.status(200).json(doc);

    });

export const updateOne = Model =>

    catchAsync(async (req, res, next) => {

        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators:true
        })

        if(!doc) return next(new ApiError(`No document found with ${req.params.id}`, 404));

        res.status(200).json(doc);


    });

export const getOne = (Model, Options) =>

    catchAsync(async (req, res, next) => {

        let query =  Model.findById(req.params.id);
        if(Options) query =  query.populate(Options);
        const doc = await query;

        if(!doc) return next(new ApiError(`No document found with ${req.params.id}`, 404));

        res.status(200).json({
            [doc._id]:doc
        });

    });




export const updateDocumentPicture = (Model, FieldName) => catchAsync( async (req, res, next) => {
    const body = req.body.id;
    const user = await Model.findByIdAndUpdate(body, {[FieldName]: req.body.contentId}, {
        runValidators: true
    });
    const fileName = req.file.path;

    res.status(200).json(fileName);
});
