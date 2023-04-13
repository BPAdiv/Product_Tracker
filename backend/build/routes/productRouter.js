"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var productController_1 = require("../controlers/productController");
var productRouter = express_1.default.Router();
productRouter.post("/verifyProduct", productController_1.verifyProduct);
productRouter.post("/followProduct", productController_1.followProduct);
productRouter.get("/", productController_1.getAllProducts);
productRouter.get("/user/:userId", productController_1.getUserProducts);
productRouter.post("/unfollow", productController_1.removeFollow);
productRouter.get("/:productAsin", productController_1.getSingleProduct);
productRouter.get("/category/:category", productController_1.getProductByCategory);
exports.default = productRouter;
