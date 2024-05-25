import { Schema, Model, model } from 'mongoose';
interface courseInterface {
    course_id: string,
    course_name: string,
    price?: number,
    description?: string,
    no_of_users?: number,
    author: string
}

const courseSchema : Schema = new Schema ({
    course_id:{
        type: String,
        unique: true,
        required: true
    },
    course_name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ""
    },
    no_of_users: {
        type: Number,
        default: 0
    },
    author: {
        type: String,
        required: true
    }
});

const courseModel: Model<courseInterface> = model<courseInterface> ('Course', courseSchema);

export default courseModel;