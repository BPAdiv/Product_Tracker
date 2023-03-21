import express from "express";
const userRouter = express.Router();
const {
  register,
  login,
  verfiyToken,
  // auth,
  // getMyInfo
} = require("../controlers/authControler");

userRouter.post("/register", register);
userRouter.post("/login", login);
// userRouter.post("/updateList", updateChecklist);
// userRouter.post("/login", login);
// userRouter.post("/auth", auth);
// userRouter.post("/profile/:username", getMyInfo);

// module.exports = userRouter;
export default userRouter;
