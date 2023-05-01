import express from "express";
import {
  register,
  login,
  verfiyToken,
  contactUsEmail,
  updateUser,
} from "../controlers/authControler";
const userRouter = express.Router();

userRouter.post("/signup", register);
userRouter.post("/login", login);
userRouter.post("/auth", verfiyToken);
userRouter.post("/contact", contactUsEmail);
userRouter.post("/updateUser", updateUser);

export default userRouter;
