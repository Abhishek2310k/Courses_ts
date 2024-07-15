import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import userModel from '../models/user'; // Adjust path as necessary
import { z } from 'zod';

const userRouter = express.Router();
userRouter.use(express.json()); // Parse JSON request bodies
userRouter.use(cookieParser()); // Use cookie-parser middleware

// Utility function to send a consistent response format
const sendResponse = (res: Response, status: number, error: boolean, message: string, data: any = null) => {
    res.status(status).json({ error, message, data });
};

// Schemas for validation (using Zod)
const signupSchema = z.object({
    email: z.string(),
    password: z.string(),
    userName: z.string()
});

const loginSchema = z.object({
    email: z.string(),
    password: z.string()
});

const publish_course_schema = z.object({
    course_id: z.string(),
    email: z.string()
});

// Route to check if server is setup successfully
userRouter.get('/check', async (req: Request, res: Response) => {
    sendResponse(res, 200, false, 'Server setup successful');
});

// Route for user signup
userRouter.post('/signup', async (req: Request, res: Response) => {
    try {
        const { email, password, userName } = signupSchema.parse(req.body);

        if (!password || !email || !userName) {
            return sendResponse(res, 400, true, 'Password, username, and email are required');
        }

        // Check if user already exists
        const user = await userModel.findOne({ email: email });
        if (user) {
            return sendResponse(res, 200, true, 'User already exists. Please login.');
        }

        // Encrypt password
        const hash = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new userModel({
            email,
            password: hash,
            userName
        });

        await newUser.save();
        sendResponse(res, 200, false, 'User added successfully');
    } catch (err) {
        sendResponse(res, 403, true, 'Unsuccessful signup', err);
    }
});

// Route for user login
userRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = loginSchema.parse(req.body);

        if (!password || !email) {
            return sendResponse(res, 400, true, 'Password and email are required');
        }

        // Check if user exists
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return sendResponse(res, 200, true, 'User does not exist. Please signup.');
        }

        // Compare passwords
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return sendResponse(res, 200, true, 'Incorrect Password');
        }

        // Generate JWT token
        const token = jwt.sign({ username: user.userName }, "jwttokenkey", { expiresIn: '12h' });

        // Set token as cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 43200000 });

        sendResponse(res, 200, false, 'Login successful');
    } catch (err) {
        sendResponse(res, 500, true, 'Error while logging in', err);
    }
});

// Route to publish a course
userRouter.post('/publishCourse', async (req: Request, res: Response) => {
    try {
        const { course_id, email } = publish_course_schema.parse(req.body);

        if (!course_id || !email) {
            return sendResponse(res, 400, true, 'course_id and email are required');
        }

        // Find user and update courses_added array
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

// Route to buy a course
userRouter.post('/buyCourse', async (req: Request, res: Response) => {
    try {
        const { course_id, email } = publish_course_schema.parse(req.body);

        if (!course_id || !email) {
            return sendResponse(res, 400, true, 'course_id and email are required');
        }

        // Find user and update courses_bought array
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
