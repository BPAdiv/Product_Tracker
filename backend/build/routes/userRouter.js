"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authControler_1 = require("../controlers/authControler");
var userRouter = express_1.default.Router();
userRouter.post("/signup", authControler_1.register);
userRouter.post("/login", authControler_1.login);
userRouter.post("/auth", authControler_1.verfiyToken);
exports.default = userRouter;
