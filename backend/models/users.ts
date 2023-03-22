// const mongoose = require("mongoose");
import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userName: { type: String, required: true },
  telegramId: { type: String },
  role: { type: String, default: "user" },
  phoneNumber: { type: String },
  country: { type: String },
  products: [{ type: Schema.Types.ObjectId, ref: "TrackProduct" }],
});

export default mongoose.model("TrackUser", UserSchema);
