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
exports.getAmazonLinks = exports.globalLink = void 0;
var axios_1 = __importDefault(require("axios"));
var cheerio_1 = __importDefault(require("cheerio"));
var products_1 = __importDefault(require("../models/products"));
// import { globalLink } from "../../controlers/productController";
var telegramBot_1 = require("../telegramBot");
exports.globalLink = "https://www.amazon.com/dp/";
var setCurrentPriceAndDate = function (productAsin, currentPrice) {
    try {
        var product = products_1.default.findOneAndUpdate({ productAsin: productAsin }, { currentPrice: currentPrice, lastUpdated: new Date() });
        if (!product)
            return console.log("couldnt find product");
        console.log("product updated successful");
    }
    catch (error) {
        console.log(error.message);
    }
};
var isPriceLower = function (wholePrice, targetProduct) {
    var productAsin = targetProduct.productAsin, followers = targetProduct.followers, _id = targetProduct._id;
    var currentPrice = wholePrice.replace("$", "");
    var numberCurrentPrice = parseInt(currentPrice);
    followers.forEach(function (follow) {
        if (numberCurrentPrice < follow.targetPrice) {
            console.log("price lower: " + numberCurrentPrice, " target: " + targetProduct.productAsin, "targetPrice: " + follow.targetPrice);
            (0, telegramBot_1.sendMessageBot)(targetProduct, follow, wholePrice);
        }
        else {
            console.log("price not lower: " + follow.targetPrice);
        }
    });
    setCurrentPriceAndDate(productAsin, currentPrice);
};
// let product:IProduct;
function getProducts(targetProduct) {
    return __awaiter(this, void 0, void 0, function () {
        var productAsin, followers, data, previousPrice, wholePrice, precentageOff, $, currentPrice, num;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    productAsin = targetProduct.productAsin, followers = targetProduct.followers;
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
                    data = (_a.sent()).data;
                    previousPrice = "";
                    wholePrice = "";
                    precentageOff = "";
                    $ = cheerio_1.default.load(data);
                    currentPrice = $("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-whole").text();
                    if (currentPrice) {
                        wholePrice = $("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2)").text();
                        previousPrice = $("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-small.aok-align-center > span > span.a-size-small.a-color-secondary.aok-align-center.basisPrice > span > span:nth-child(2)").text();
                        precentageOff = $("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-size-large.a-color-price.savingPriceOverride.aok-align-center.reinventPriceSavingsPercentageMargin.savingsPercentage").text();
                        return [2 /*return*/, isPriceLower(wholePrice, targetProduct)];
                    }
                    //second optin price regular
                    if (!currentPrice) {
                        console.log("there is no price to display");
                        currentPrice = $("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span > span:nth-child(2) > span.a-price-whole").text();
                        wholePrice = $("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span > span:nth-child(2)").text();
                    }
                    if (wholePrice) {
                        return [2 /*return*/, isPriceLower(wholePrice, targetProduct)];
                    }
                    //third option price is wierd
                    if (!currentPrice) {
                        console.log("there is no price to display the second option");
                        // currentPrice = $(
                        //   "#corePrice_desktop > div > table > tbody > tr > td.a-span12 > span.a-price.a-text-price.a-size-medium.apexPriceToPay > span:nth-child(2)"
                        // ).text();
                        wholePrice = $("#corePrice_desktop > div > table > tbody > tr > td.a-span12 > span.a-price.a-text-price.a-size-medium.apexPriceToPay > span:nth-child(2)").text();
                        if (!wholePrice) {
                            wholePrice = $("#corePrice_desktop > div > table > tbody > tr > td.a-span12 > span.a-price.a-text-price.a-size-medium.apexPriceToPay > span.a-offscreen").text();
                        }
                    }
                    if (wholePrice) {
                        return [2 /*return*/, isPriceLower(wholePrice, targetProduct)];
                    }
                    //product unavailable
                    if (!currentPrice) {
                        console.log("there is no price to display the third option");
                        currentPrice = $("#availability > span").text().trim();
                    }
                    num = parseInt(currentPrice);
                    console.log({
                        productAsin: productAsin,
                        currentPrice: currentPrice,
                        num: num,
                        wholePrice: wholePrice,
                        previousPrice: previousPrice,
                        precentageOff: precentageOff,
                    });
                    setCurrentPriceAndDate(productAsin, currentPrice);
                    return [2 /*return*/];
            }
        });
    });
}
var getAmazonLinks = function () { return __awaiter(void 0, void 0, void 0, function () {
    var products, promises, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, products_1.default.find().populate("followers.userId")];
            case 1:
                products = _a.sent();
                if (!products) {
                    return [2 /*return*/, "has been error finding products links"];
                }
                promises = products.map(function (element) {
                    return getProducts(element);
                });
                return [4 /*yield*/, Promise.all(promises)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAmazonLinks = getAmazonLinks;
