require("dotenv").config(); // .env file support for configuration
// const express = require("express");
// import express from "express";
import express, { Express } from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "../routes/userRouter";
import axios from "axios";
import cheerio from "cheerio";

const app = express();
// connect to db (mongodb + mongoose)
mongoose
  .connect(process.env.MONGO as string, {})
  .then(() => console.log("connected"))
  .catch((err: any) => {
    console.log("unsucc");
    console.log(err);
  });

app.use(cors()); // allow cors origin
app.use(express.json());

// app.use("/api/user", userRouter);

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

async function getProducts() {
  const { data } = await axios.get(
    "https://www.amazon.com/-/he/MacBook-%D7%96%D7%99%D7%9B%D7%A8%D7%95%D7%9F-%D7%90%D7%97%D7%95%D7%A8%D7%99%D7%AA-FaceTime-%D7%90%D7%99%D7%99%D7%A4%D7%95%D7%9F/dp/B08N5LNQCX/ref=sr_1_4?qid=1679261541&s=computers-intl-ship&sr=1-4&language=en_US&currency=USD"
  );
  const $ = cheerio.load(data);
  product.link =
    "https://www.amazon.com/-/he/MacBook-%D7%96%D7%99%D7%9B%D7%A8%D7%95%D7%9F-%D7%90%D7%97%D7%95%D7%A8%D7%99%D7%AA-FaceTime-%D7%90%D7%99%D7%99%D7%A4%D7%95%D7%9F/dp/B08N5LNQCX/ref=sr_1_4?qid=1679261541&s=computers-intl-ship&sr=1-4&language=en_US&currency=USD";
  product.price = $(
    " span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-whole"
  ).text();
  product.name = $("#productTitle").text();
  console.log(product);
}
getProducts();
