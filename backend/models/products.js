const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  link: { type: String, required: true },
  priceRange: { type: Number, required: true },
  image: { type: String, default: "" },
  title: { type: String, default: "" },
  previousPrice: { type: Number, default: "" },
  salePrice: { type: Number, default: "" },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, default: "" },
});
module.exports = mongoose.model("TrackProduct", ProductSchema);
