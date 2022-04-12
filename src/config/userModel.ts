import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    createdAt: String,
    deviceID:[String]
});

export const userModel = model('user' ,userSchema);