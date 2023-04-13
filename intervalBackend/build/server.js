"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config(); // .env file support for configuration
// const express = require("express");
// import express from "express";
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var mongoose_1 = __importDefault(require("mongoose"));
var telegramBot_1 = require("./telegramBot");
var app = (0, express_1.default)();
// connect to db (mongodb + mongoose)
mongoose_1.default
    .connect(process.env.MONGO, {})
    .then(function () {
    // getAmazonLinks();
    (0, telegramBot_1.activateBot)();
    console.log("connected");
})
    .catch(function (err) {
    console.log("unsucc");
    console.log(err);
});
app.use((0, cors_1.default)()); // allow cors origin
app.use(express_1.default.json());
// app.use("/api/user", userRouter);
// app.use("/api/product", productRouter);
app.use(express_1.default.json());
app.listen(8000, function () { return console.log("listen on port 8000"); });
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
// https://www.amazon.com/gp/aod/ajax/?asin=B097T276QL&m=&smid=&sourcecustomerorglistid=&sourcecustomerorglistitemid=&sr=8-5&pc=dp
