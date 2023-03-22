const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  link: { type: String, required: true },
  targetPrice: { type: Number, required: true },
  image: { type: String },
  title: { type: String },
  previousPrice: { type: Number },
  salePrice: { type: Number },
  createdAt: { type: Date, required: true },
  saleDate: { type: Date },
  category: { type: String },
  company: { type: String },
  country: { type: String },
  followers: [{ type: mongoose.Types.ObjectId, ref: "TrackUser" }],
});
module.exports = mongoose.model("TrackProduct", ProductSchema);
