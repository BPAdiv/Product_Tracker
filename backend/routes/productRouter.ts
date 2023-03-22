import express, { Router } from "express";
import {
  verifyProduct,
  followProduct,
  getAllProducts,
  getSingleProduct,
  getProductByCategory,
  removeFollow,
} from "../controlers/productController";
const productRouter: Router = express.Router();

productRouter.post("/verifyProduct", verifyProduct);
productRouter.post("/followProduct", followProduct);
productRouter.get("/", getAllProducts);
productRouter.post("/unfollow", removeFollow);
productRouter.get("/:productId", getSingleProduct);
productRouter.get("/category/:category", getProductByCategory);
export default productRouter;
