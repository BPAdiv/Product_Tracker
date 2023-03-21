// const mongoose = require("mongoose");
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userName: { type: String, required: true },
  telegramId: { type: String, default: "" },
  products: [{ type: mongoose.Types.ObjectId, ref: "TrackProduct" }],
});

export default mongoose.model("TrackUser", UserSchema);
