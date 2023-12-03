import express from "express";
import UserController from "./user.controller.js";
import jwtAuth from "../../middlewares/jwtAuth.js";

const router = express.Router();

const userController = new UserController();

// Routes for User SignIn and SignUp
router.route("/signup").post((req, res) => {
    userController.postSignUp(req, res)
});
router.route("/signup").get((req, res) => {
    userController.getSignUp(req, res)
});
router.route("/signin").get((req, res) => {
    userController.getSignIn(req, res) 
});
router.route("/signin").post((req, res) => {
    userController.postSignIn(req, res) 
});

export default router;
