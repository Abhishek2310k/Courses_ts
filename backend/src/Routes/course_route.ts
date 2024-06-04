import express, { Request, Response } from 'express';
import courseModel from '../models/course';
const course_router = express.Router();

course_router.get("/get_courses",async (req: Request,res: Response)=>{
    const data = await courseModel.find();
    return res.json(data);
})

course_router.post("/add_course",async(req: Request,res: Response)=>{
    try {
        const {course_id,course_name,price,description,author} = req.body;

        const newCourse = new courseModel({
            course_id,
            course_name,
            price,
            description,
            author
        })

        await newCourse.save();
        return res.status(200).json({"message":"successfully added the course"});
    } catch (err) {
        return res.status(500).json(err);
    }
})

course_router.post("/delete_course",async(req: Request,res: Response)=>{
    const {id} = req.body;
    console.log(id);
    try {
        await courseModel.findByIdAndDelete({_id:id});
        return res.status(200).json({"message":"course id is deleted"});
    } catch (err) {
        res.status(500).json(err);
    }
})

course_router.post("/update_course",async(req:Request,res:Response)=>{
    const {id,updated} = req.body;
    try {
        const { course_id, author, course_name, description, price } = updated;
        await courseModel.findByIdAndUpdate({_id:id},{course_id,
            author,
            course_name,
            description,
            price});
        return res.status(200).json({message:"update successful"});
    } catch (err) {
        return res.status(500).json(err);
    }
})



export default course_router;
