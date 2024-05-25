import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './Routes/course_route';
import dotenv from 'dotenv'; 
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use('/course', router);

if (!process.env.DATABASE) {
    throw new Error("DATABASE environment variable is not defined");
}

const connection_string: string = process.env.DATABASE; 

async function make_connection() {
    await mongoose.connect(connection_string);
    console.log("connection to data base success");
}

make_connection().catch((err) => console.log(err));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`The application is listening on port ${PORT}!`);
});
