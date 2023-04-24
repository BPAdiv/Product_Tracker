import express from "express";
import {
  register,
  login,
  verfiyToken,
  contactUsEmail,
} from "../controlers/authControler";
const userRouter = express.Router();

userRouter.post("/signup", register);
userRouter.post("/login", login);
userRouter.post("/auth", verfiyToken);
userRouter.post("/contact", contactUsEmail);

export default userRouter;
