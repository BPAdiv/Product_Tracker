import mongoose, { Schema } from "mongoose";

const ProductSchema = new mongoose.Schema({
  productAsin: { type: String, required: true },
  image: { type: String },
  title: { type: String },
  previousPrice: { type: Number },
  salePrice: { type: Number },
  createdAt: { type: Date, required: true },
  saleDate: { type: Date },
  category: { type: String },
  company: { type: String },
  country: { type: String },
  followers: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "TrackUser", required: true },
      targetPrice: { type: Number, required: true },
    },
  ],
});
export default mongoose.model("TrackProduct", ProductSchema);
