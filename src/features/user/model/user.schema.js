import mongoose from "mongoose";

// Schema for Users
export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [3, "The name should be at least 3 characters long"]
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: ['Male', 'male', 'MALE', 'Female', 'female', 'FEMALE', 'Other', 'other', 'OTHER']
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [/.+\@.+\../, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    loginTokens: {
        type: [String],
    },
});