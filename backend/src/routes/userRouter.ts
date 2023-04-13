import express from "express";
import { register, login, verfiyToken } from "../controlers/authControler";
const userRouter = express.Router();

userRouter.post("/signup", register);
userRouter.post("/login", login);
userRouter.post("/auth", verfiyToken);

export default userRouter;
