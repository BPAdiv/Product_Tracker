require("dotenv").config(); // .env file support for configuration
// const express = require("express");
// import express from "express";
import express, { Express } from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "../routes/userRouter";
import axios from "axios";
import cheerio from "cheerio";
import productRouter from "../routes/productRouter";

import { getAmazonLinks } from "./cheerio/amazonTrack";
import { activateBot } from "./telegramBot";

const app = express();
// connect to db (mongodb + mongoose)
mongoose
  .connect(process.env.MONGO as string, {})
  .then(() => {
    // getAmazonLinks();
    activateBot();
    console.log("connected");
  })
  .catch((err: any) => {
    console.log("unsucc");
    console.log(err);
  });

app.use(cors()); // allow cors origin
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.post("/webhook", (req, res) => {
  const { message } = req.body;
  console.log(message);

  // process the message received from Telegram
  // authenticate the user on your website and allow them to access the website's features
});

app.listen(8000, () => console.log("listen on port 8000"));

interface amazonProduct {
  name: string;
  price: string;
  link: string;
}

const product: amazonProduct = {
  name: "",
  price: "",
  link: "",
};

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
