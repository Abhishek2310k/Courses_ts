import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userModel from '../models/user';
const userRouter = express.Router();

userRouter.get('/check', async (req: Request, res: Response) => {
  return res.json({ message: 'successful setup' });
});

userRouter.post('/signup', async (req: Request, res: Response) => {
    const { email, password, userName } = req.body;

    if (!password || !email || !userName) {
    return res.status(400).json({ error:true, message: 'password, usename and email are required' });
    }

    // Checking if the user already exists
    try {
        const user = await userModel.findOne({ email: email });
        if (user != null) {
          return res.status(200).json({ error: true, message: 'User already exists. Please login.' });
        }
        // Encrypting password thus obtained
        const hash = await bcrypt.hash(password,10);

        const newUser = new userModel({
          email,
          password: hash,
          userName
        });

        await newUser.save();
        return res.status(200).json({ error: false, message: 'User added successfully' });
    } catch (err) {
        return res.status(500).json({error: true, message: "error during signup" , err});
    }
});

userRouter.post('/login', async(req:Request,res:Response)=> {
    const {email, password} = req.body;

    if (!password || !email) {
        return res.status(400).json({ error:true, message: 'password and email are required' });
    }


    try {
        const user = await userModel.findOne({email:email});
        if (user == null) return res.status(200).json({error:true,message:"User does not exist please signup"});

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(200).json({error:true, message: "Incorrect Password"});
        }

        const token = jwt.sign({username:user.userName},"jwttokenkey",{expiresIn:'12h'});
        res.cookie('token',token,{httpOnly:true,maxAge:4320000});
        return res.status(200).json({error:false,message: "login successful"});
    } catch (err) {
        res.status(500).json({error: true, message: 'An error occured', err})
    }
})

userRouter.post('/publishCourse', async (req: Request, res: Response) => {
    const { course_id, email } = req.body;

    if (!course_id || !email) {
        return res.status(400).json({ error:true, message: 'course_id and email are required' });
    }

    try {
        const user = await userModel.findOneAndUpdate(
            { email: email },
            { $addToSet: { courses_added: course_id } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error:true, message: 'User not found' });
        }

        res.status(200).json({ error:false, message: 'Course added successfully', user });
    } catch (err) {
        res.status(500).json({ error: false, message: 'An error occurred', err });
    }
});

userRouter.post('/buyCourse', async(req:Request, res: Response)=> {
    const { course_id, email } = req.body;

    if (!course_id || !email) {
        return res.status(400).json({ error:true, message: 'course_id and email are required' });
    }

    try {
        const user = await userModel.findOneAndUpdate(
            { email: email },
            { $addToSet: { courses_bought: course_id } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error:true, message: 'User not found' });
        }

        res.status(200).json({ error:false, message: 'Course bought successfully', user });
    } catch (err) {
        res.status(500).json({ error: false, message: 'An error occurred', err });
    }
});


export default userRouter;
