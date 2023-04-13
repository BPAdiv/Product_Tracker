"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFollow = exports.getProductByCategory = exports.getSingleProduct = exports.getUserProducts = exports.getAllProducts = exports.followProduct = exports.verifyProduct = exports.globalLink = void 0;
var products_1 = __importDefault(require("../models/products"));
var axios_1 = __importDefault(require("axios"));
var cheerio_1 = __importDefault(require("cheerio"));
exports.globalLink = "https://www.amazon.com/dp/";
var extractProductAsin = function (productLink) {
    // const url =
    //   "https://www.amazon.com/-/he/60716_BLACK/dp/B0B1TZZPYJ/ref=sr_1_3?crid=30MH2CWLQPC9V&keywords=jeep+wrangler+accessories&qid=1679569046&sprefix=%2Caps%2C181&sr=8-3";
    var regex = RegExp("(?:dp|gp/product)(?:/glance)?/(\\w{10})");
    var m = productLink.match(regex);
    if (m) {
        console.log("ASIN=" + m[1]);
        return m[1];
    }
    return false;
};
var verifyProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, productLink, targetPrice, productAsin, data, $, productTitle, productImage, currentPrice, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, productLink = _a.productLink, targetPrice = _a.targetPrice;
                if (!productLink)
                    res.status(404).json({ message: "No link provided" });
                productAsin = extractProductAsin(productLink);
                if (!productAsin)
                    res.status(404).json({ message: "product asin not found" });
                return [4 /*yield*/, axios_1.default.get("".concat(exports.globalLink + productAsin, "?&language=en_US"), {
                        headers: {
                            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
                            "sec-ch-ua-platform": "Windows",
                            pragma: "no-cache",
                            accept: "text/html,/",
                            "x-requested-with": "XMLHttpRequest",
                            host: "www.amazon.com",
                        },
                    })];
            case 1:
                data = (_b.sent()).data;
                $ = cheerio_1.default.load(data);
                productTitle = $("#productTitle").text().trim();
                productImage = $("#landingImage").attr("src");
                currentPrice = $("#corePrice_feature_div > div > span > span.a-offscreen").text();
                if (!productTitle || !productImage) {
                    res.status(404).json({ message: "Product not found" });
                }
                if (!currentPrice) {
                    console.log("there is no price to display");
                    currentPrice = $("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span > span.a-offscreen")
                        .first()
                        .text();
                }
                if (!currentPrice) {
                    console.log("there is no price to display the second option");
                    // currentPrice = $(
                    //   "#corePrice_desktop > div > table > tbody > tr > td.a-span12 > span.a-price.a-text-price.a-size-medium.apexPriceToPay > span:nth-child(2)"
                    // ).text();
                    currentPrice = $("#corePrice_desktop > div > table > tbody > tr > td.a-span12 > span.a-price.a-text-price.a-size-medium.apexPriceToPay > span:nth-child(2)")
                        .first()
                        .text();
                }
                if (!currentPrice) {
                    console.log("there is no price to display the third option");
                    currentPrice = $("#availability > span").text().trim();
                }
                if (!currentPrice) {
                    currentPrice = "No Details Available";
                }
                res.status(200).json({
                    productTitle: productTitle,
                    productImage: productImage,
                    currentPrice: currentPrice,
                    targetPrice: targetPrice,
                    productAsin: productAsin,
                });
                console.log({
                    productTitle: productTitle,
                    productLink: productLink,
                    productImage: productImage,
                    currentPrice: currentPrice,
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.log(error_1);
                res
                    .status(500)
                    .json({ message: error_1.message, link: "link might not be found" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.verifyProduct = verifyProduct;
var followProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, productLink, targetPrice, productTitle, productImage, userId, productAsin, currentPrice, checkProduct, savedCheckProduct, newFollow, savedFollow, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, productLink = _a.productLink, targetPrice = _a.targetPrice, productTitle = _a.productTitle, productImage = _a.productImage, userId = _a.userId, productAsin = _a.productAsin, currentPrice = _a.currentPrice;
                if (!productAsin || !targetPrice || !userId) {
                    return [2 /*return*/, res
                            .status(404)
                            .json({ message: "product asin or target price did not exist" })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, products_1.default.findOne({ productAsin: productAsin })];
            case 2:
                checkProduct = _b.sent();
                if (!checkProduct) return [3 /*break*/, 4];
                checkProduct.followers.push({ userId: userId, targetPrice: targetPrice });
                checkProduct.currentPrice = currentPrice;
                checkProduct.lastUpdated = new Date();
                return [4 /*yield*/, checkProduct.save()];
            case 3:
                savedCheckProduct = _b.sent();
                // const savedUser = await user.save();
                if (!savedCheckProduct) {
                    return [2 /*return*/, res.status(400).json({ message: "something went wrong" })];
                }
                return [2 /*return*/, res.status(201).json({
                        message: "Following Product",
                        followProduct: savedCheckProduct,
                    })];
            case 4:
                newFollow = new products_1.default({
                    productAsin: productAsin,
                    title: productTitle,
                    image: productImage,
                    currentPrice: currentPrice,
                    lastUpdated: new Date(),
                    createdAt: new Date(),
                });
                newFollow.followers.push({ userId: userId, targetPrice: targetPrice });
                return [4 /*yield*/, newFollow.save()];
            case 5:
                savedFollow = _b.sent();
                // const savedUser = await user.save();
                if (!savedFollow) {
                    return [2 /*return*/, res.status(400).json({ message: "something went wrong" })];
                }
                return [2 /*return*/, res
                        .status(201)
                        .json({ message: "Following Product", followProduct: savedFollow })];
            case 6:
                error_2 = _b.sent();
                res.status(500).json({ message: error_2.message });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.followProduct = followProduct;
var getAllProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, products_1.default.find().populate("followers.userId", "-password -role")];
            case 1:
                products = _a.sent();
                if (!products) {
                    return [2 /*return*/, res.status(404).json({ message: "Couldn't find products" })];
                }
                res.status(200).json({ products: products });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500).json({ message: error_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllProducts = getAllProducts;
var getUserProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, products, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, products_1.default.find({
                        "followers.userId": userId,
                    }).populate("followers.userId", "-password -role")];
            case 2:
                products = _a.sent();
                if (!products) {
                    return [2 /*return*/, res.status(404).json({ message: "Couldn't find products" })];
                }
                res.status(200).json({ products: products });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(500).json({ message: error_4.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUserProducts = getUserProducts;
var getSingleProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productAsin, singleProduct, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productAsin = req.params.productAsin;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, products_1.default.findOne({
                        productAsin: productAsin,
                    }).populate("followers.userId", "-password -role")];
            case 2:
                singleProduct = _a.sent();
                if (!singleProduct) {
                    return [2 /*return*/, res.status(404).json({ message: "Couldn't find product" })];
                }
                res.status(200).json({ singleProduct: singleProduct });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                res.status(500).json({ message: error_5.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getSingleProduct = getSingleProduct;
var getProductByCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var category, products, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                category = req.params.category;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, products_1.default.find({ category: category }).populate("followers.userId", "-password -role")];
            case 2:
                products = _a.sent();
                if (!products) {
                    return [2 /*return*/, res.status(404).json({ message: "could not find " })];
                }
                res.status(200).json({ products: products });
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                res.status(500).json({ message: error_6.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getProductByCategory = getProductByCategory;
var removeFollow = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, productId, userId, unFolloweProduct, removeProduct, savedProduct, error_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, productId = _a.productId, userId = _a.userId;
                if (!productId || !userId) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: " There is  No Product ID or userId" })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, products_1.default.findById(productId)];
            case 2:
                unFolloweProduct = _b.sent();
                if (!unFolloweProduct) {
                    return [2 /*return*/, res.status(400).json({ message: "could not find product" })];
                }
                unFolloweProduct.followers = unFolloweProduct.followers.filter(function (objUser) { return objUser.userId.toString() !== userId; });
                if (!!unFolloweProduct.followers.length) return [3 /*break*/, 4];
                return [4 /*yield*/, products_1.default.findByIdAndDelete(productId)];
            case 3:
                removeProduct = _b.sent();
                if (!removeProduct) {
                    return [2 /*return*/, res.status(400).json({ message: "something went wrong" })];
                }
                return [2 /*return*/, res.status(200).json({ messgae: "unfollow product is completed" })];
            case 4:
                savedProduct = unFolloweProduct.save();
                if (!savedProduct) {
                    return [2 /*return*/, res.status(401).json({ message: "could not unfollow product" })];
                }
                res.status(200).json({ messgae: "unfollow product is completed" });
                return [3 /*break*/, 6];
            case 5:
                error_7 = _b.sent();
                res.status(504).json({ message: error_7.message });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.removeFollow = removeFollow;
// async function getProducts() {
//   const { data } = await axios.get(
//     "https://www.amazon.com/-/he/MacBook-%D7%96%D7%99%D7%9B%D7%A8%D7%95%D7%9F-%D7%90%D7%97%D7%95%D7%A8%D7%99%D7%AA-FaceTime-%D7%90%D7%99%D7%99%D7%A4%D7%95%D7%9F/dp/B08N5LNQCX/ref=sr_1_4?qid=1679261541&s=computers-intl-ship&sr=1-4&language=en_US&currency=USD",
//     {
//       headers: {
//         "user-agent":
//           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
//         "sec-ch-ua-platform": "Windows",
//         pragma: "no-cache",
//         accept: "text/html,/",
//         "x-requested-with": "XMLHttpRequest",
//         host: "www.amazon.com",
//       },
//     }
//   );
//   const $ = cheerio.load(data);
//   product.link =
//     "https://www.amazon.com/-/he/MacBook-%D7%96%D7%99%D7%9B%D7%A8%D7%95%D7%9F-%D7%90%D7%97%D7%95%D7%A8%D7%99%D7%AA-FaceTime-%D7%90%D7%99%D7%99%D7%A4%D7%95%D7%9F/dp/B08N5LNQCX/ref=sr_1_4?qid=1679261541&s=computers-intl-ship&sr=1-4&language=en_US&currency=USD";
//   product.price = $(
//     " span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-whole"
//   ).text();
//   product.name = $("#productTitle").text();
//   console.log(product);
// }
// getProducts();
