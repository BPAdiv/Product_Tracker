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
  try {
    const { data } = await axios.get(
      "https://www.amazon.com/gp/product/ajax?asin=B097T276QL&experienceId=aodAjaxMain",
      {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
          "sec-ch-ua-platform": "Windows",
          pragma: "no-cache",
          accept: "text/html,*/*",
          "x-requested-with": "XMLHttpRequest",
          host: "www.amazon.com",
          // cookie: ``,

          // sec-ch-ua: "Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"
        },
      }
    );
    const $ = cheerio.load(data);
    product.link =
      "https://www.amazon.com/dp/B09TZWLFLY/ref=fs_a_mbt2_us2/132-5944599-9818649?_encoding=UTF8&th=1";
    product.price = $("#aod-price-0  .a-offscreen").text();
    product.name = $("#aod-asin-title-text").text();
    console.log(product);
  } catch (error) {
    console.log(error);
  }
}
function get() {
  axios
    .get(
      "https://www.amazon.com/gp/product/ajax?asin=B09YCWFKNC&experienceId=aodAjaxMain"
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
getProducts();

// https://www.amazon.com/gp/aod/ajax/?asin=B097T276QL&m=&smid=&sourcecustomerorglistid=&sourcecustomerorglistitemid=&sr=8-5&pc=dp
