import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userModel from '../models/user';
const userRouter = express.Router();
import {z} from 'zod';

// Utility function to send a consistent response format
const sendResponse = (res: Response, status: number, error: boolean, message: string, data: any = null) => {
    res.status(status).json({ error, message, data });
};

const signupSchema = z.object({
    email:z.string(),
    password:z.string(),
    userName:z.string()
});

const loginSchema = z.object({
    email:z.string(),
    password:z.string()
});

const publish_course_schema = z.object({
    course_id:z.string(),
    email:z.string()
});

userRouter.get('/check', async (req: Request, res: Response) => {
    sendResponse(res, 200, false, 'successful setup');
});

userRouter.post('/signup', async (req: Request, res: Response) => {

    // Checking if the user already exists
    try {
        const { email, password, userName } = signupSchema.parse(req.body);

        if (!password || !email || !userName) {
            return sendResponse(res, 400, true, 'password, username, and email are required');
        }
        const user = await userModel.findOne({ email: email });
        if (user != null) {
            return sendResponse(res, 200, true, 'User already exists. Please login.');
        }
        // Encrypting password
        const hash = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            email,
            password: hash,
            userName
        });

        await newUser.save();
        sendResponse(res, 200, false, 'User added successfully');
    } catch (err) {
        sendResponse(res, 403, true, 'unsuccessful signup', err);
    }
});

userRouter.post('/login', async (req: Request, res: Response) => {
    
    try {
        const { email, password } = loginSchema.parse(req.body);

        if (!password || !email) {
            return sendResponse(res, 400, true, 'password and email are required');
        }
        const user = await userModel.findOne({ email: email });
        if (user == null) {
            return sendResponse(res, 200, true, 'User does not exist. Please signup.');
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return sendResponse(res, 200, true, 'Incorrect Password');
        }

        const token = jwt.sign({ username: user.userName }, "jwttokenkey", { expiresIn: '12h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 43200000 });
        sendResponse(res, 200, false, 'login successful');
    } catch (err) {
        sendResponse(res, 500, true, 'error while logging in', err);
    }
});

userRouter.post('/publishCourse', async (req: Request, res: Response) => {
    try {
        const { course_id, email } = publish_course_schema.parse(req.body);

        if (!course_id || !email) {
            return sendResponse(res, 400, true, 'course_id and email are required');
        }
        const user = await userModel.findOneAndUpdate(
            { email: email },
            { $addToSet: { courses_added: course_id } },
            { new: true }
        );

        if (!user) {
            return sendResponse(res, 404, true, 'User not found');
        }

        sendResponse(res, 200, false, 'Course added successfully', user);
    } catch (err) {
        sendResponse(res, 500, true, 'An error occurred', err);
    }
});

userRouter.post('/buyCourse', async (req: Request, res: Response) => {
    try {
        const { course_id, email } = publish_course_schema.parse(req.body);

        if (!course_id || !email) {
            return sendResponse(res, 400, true, 'course_id and email are required');
        }
    
        const user = await userModel.findOneAndUpdate(
            { email: email },
            { $addToSet: { courses_bought: course_id } },
            { new: true }
        );

        if (!user) {
            return sendResponse(res, 404, true, 'User not found');
        }

        sendResponse(res, 200, false, 'Course bought successfully', user);
    } catch (err) {
        sendResponse(res, 500, true, 'An error occurred', err);
    }
});

export default userRouter;
