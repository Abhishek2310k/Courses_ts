import express, { Request, Response } from 'express';
import courseModel from '../models/course';
const course_router = express.Router();
import { z } from 'zod';

const add_course_schema = z.object({
    course_id: z.string(),
    course_name: z.string(),
    price: z.number(),
    description: z.string(),
    author: z.string()
});

const delete_course_schema = z.object({
    id: z.string(),
});

const get_course_schema = z.object({
    id: z.string(),
});

const update_course_schema = z.object({
    _id: z.string(),
    course_id: z.string(),
    author: z.string(),
    course_name: z.string(),
    description: z.string(),
    price: z.number(),
    no_of_users: z.number()
});

// Utility function to send a consistent response format
const sendResponse = (res: Response, status: number, error: boolean, message: string, data: any = null) => {
    res.status(status).json({ error, message, data });
};

course_router.get("/get_courses", async (req: Request, res: Response) => {
    try {
        const author = req.query.author || "";
        let courses;
        if (author) {
            courses = await courseModel.find({ author: author });
        } else {
            courses = await courseModel.find();
        }

        sendResponse(res, 200, false, 'Courses retrieved successfully', courses);
    } catch (err) {
        sendResponse(res, 500, true, 'Error retrieving courses', err);
    }
});

course_router.post("/add_course", async (req: Request, res: Response) => {
    try {
        const { course_id, course_name, price, description, author } = add_course_schema.parse(req.body);

        const newCourse = new courseModel({
            course_id,
            course_name,
            price,
            description,
            author
        });

        await newCourse.save();
        sendResponse(res, 200, false, 'Successfully added the course');
    } catch (err) {
        sendResponse(res, 500, true, 'Error adding course', err);
    }
});

course_router.post("/delete_course", async (req: Request, res: Response) => {
    try {
        const { id } = delete_course_schema.parse(req.body);
        await courseModel.findByIdAndDelete({ _id: id });
        sendResponse(res, 200, false, 'Course deleted successfully');
    } catch (err) {
        sendResponse(res, 500, true, 'Error deleting course', err);
    }
});

course_router.post("/update_course", async (req: Request, res: Response) => {
    try {
        const { _id, course_id, author, course_name, description, price, no_of_users } = update_course_schema.parse(req.body);
        await courseModel.findByIdAndUpdate(
            { _id },
            { course_id, author, course_name, description, price, no_of_users }
        );
        sendResponse(res, 200, false, 'Update successful');
    } catch (err) {
        sendResponse(res, 500, true, 'Error updating course', err);
    }
});

course_router.get("/get_course", async (req: Request, res: Response) => {
    try {
        const id = req.query.id || "";
        console.log(id);
        const course = await courseModel.findById(id);
        sendResponse(res, 200, false, 'Course received', course);
    } catch (err) {
        sendResponse(res, 500, true, 'Error getting the course', err);
    }
})

export default course_router;
