import express, { Router } from "express";
import {
  verifyProduct,
  followProduct,
  getAllProducts,
  getSingleProduct,
  getProductByCategory,
  removeFollow,
  getUserProducts,
} from "../controlers/productController";
const productRouter: Router = express.Router();

productRouter.post("/verifyProduct", verifyProduct);
productRouter.post("/followProduct", followProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/user/:userId", getUserProducts);
productRouter.post("/unfollow", removeFollow);
productRouter.get("/:productAsin", getSingleProduct);
productRouter.get("/category/:category", getProductByCategory);
export default productRouter;
