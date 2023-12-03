import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

import { userSchema } from "./user.schema.js";
import { customErrorHandler } from "../../../middlewares/errorHandler.js";
import { compareHashedPassword, hashPassword } from "../../../utils/hashPassword.js";

const UserModel = mongoose.model('User', userSchema);

export default class UserRepository {

    // Repository for signing up
    async postSignUp(userData) {
        try {
            const email = userData.email;
            const user = await UserModel.findOne({ email });
            if(user) return null;
            const newUser = new UserModel(userData, { loginTokens: [] } );
            await newUser.save();
            return newUser;
        } catch(err) {
            console.log(err);
            throw new customErrorHandler(500, "Something went wrong in Repository.");
        }
    };

    // Repository for signing in
    async postSignIn(userData) {
        try {
            const { email, password } = userData;
            const emailFind = await UserModel.findOne({ email });
            if(!emailFind) {
                return { success: false, msg: "user not found", statusCode: 404 };
            } else {
                const user = await compareHashedPassword(password, emailFind.password);
                if(!user) {
                    return { success: false, msg: "Incorrect Password", statusCode: 400 };
                }
                const token = jwt.sign(
                    { userId: emailFind._id, userEmail: email },
                    "ninja",
                    { expiresIn: "1h" }
                );
                await UserModel.findOneAndUpdate({ email }, { $push: {"loginTokens": token } }, {safe: true, upsert: true, new: true });
                return { success: true, msg: "Logged in successfully", details: emailFind, token: token };
            }
        } catch(err) {
            console.log(err);
            throw new customErrorHandler(500, "Something went wrong in Repository.");
        }
    };
};