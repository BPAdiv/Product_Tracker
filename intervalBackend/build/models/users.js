"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoose = require("mongoose");
var mongoose_1 = __importDefault(require("mongoose"));
var UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userName: { type: String, required: true },
    telegramId: { type: String, unique: true },
    role: { type: String, default: "user" },
    phoneNumber: { type: String },
    country: { type: String },
});
exports.default = mongoose_1.default.model("TrackUser", UserSchema);
