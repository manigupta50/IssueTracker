import UserRepository from "./model/user.repository.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";
import { hashPassword } from "../../utils/hashPassword.js";

export default class UserController {

  constructor() {
    this.userRepository = new UserRepository();
  }

  // Controllers for User Registration
  async getSignUp(req, res) {
    return res.render('signup');
  }
  async postSignUp(req, res) {
    const { name, gender, email } = req.body;
    let { password } = req.body;
    const loginTokens = null;
    try {
      const hashedPassword = await hashPassword(password);
      password = hashedPassword;
      const userData = { name, gender, email, password };
      const user = await this.userRepository.postSignUp(userData);
      if(user) return res.status(201).redirect('/api/users/signin');
      else return res.status(400).send("Email already in use");
    } catch(err) {
        console.log(err);
        throw new customErrorHandler(500, "Something went wrong in Controller.");
    }
  };

  // Controllers for User Login
  async getSignIn(req, res) {
    return res.render('signin');
  }
  async postSignIn(req, res) {
    try {
      let status = await this.userRepository.postSignIn(req.body);
      if (status.success) {
        res
          .status(201)
          .cookie('jwtToken', status.token, {maxAge: 900000, httpOnly: false})
          .cookie("userId", status.details._id, { maxAge: 900000, httpOnly: false })
          .cookie("name", status.details.name, { maxAge: 900000, httpOnly: false })
          .redirect('/api/projects');
          // .json({ status: "success", msg: "login successful", token: status.token});
          
      } else {
        res.status(400).json({ status: "failure", msg: status.msg });
      }
    } catch(err) {
        console.log(err);
        throw new customErrorHandler(500, "Something went wrong in Controller.");
    }
  };
}