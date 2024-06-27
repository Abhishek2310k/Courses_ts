import { Schema, Model, model } from 'mongoose';

interface userInterface {
    email:string;
    password:string
    userName:string
    courses_added?:string[]
    courses_bought?:string[]
}

const userSchema : Schema = new Schema({
    email:{
        type:String,
        unique: true,
        required: true
    },
    password:{
        type:String,
        required: true,
    },
    userName:{
        type:String,
        required: true,
        unique: true,
    },
    courses_added:{
        type:[String],
        required:false
    },
    courses_bought: {
        type:[String],
        required:false
    }
});

const userModel : Model<userInterface> = model<userInterface>("User", userSchema);

export default userModel;