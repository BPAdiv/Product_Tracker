import { Request, Response } from "express";
import User from "../models/users";
import Product from "../models/products";
import axios from "axios";
import cheerio from "cheerio";
import { json } from "stream/consumers";

export const globalLink = "https://www.amazon.com/dp/";
const extractProductAsin = (productLink: string): string | boolean => {
  // const url =
  //   "https://www.amazon.com/-/he/60716_BLACK/dp/B0B1TZZPYJ/ref=sr_1_3?crid=30MH2CWLQPC9V&keywords=jeep+wrangler+accessories&qid=1679569046&sprefix=%2Caps%2C181&sr=8-3";
  const regex = RegExp("(?:dp|gp/product)(?:/glance)?/(\\w{10})");
  const m = productLink.match(regex);
  if (m) {
    console.log("ASIN=" + m[1]);
    return m[1];
  }
  return false;
};

export const verifyProduct = async (req: Request, res: Response) => {
  try {
    const { productLink, targetPrice } = req.body;
    if (!productLink) res.status(404).json({ message: "No link provided" });
    const productAsin = extractProductAsin(productLink);
    if (!productAsin)
      res.status(404).json({ message: "product asin not found" });

    const { data } = await axios.get(
      `${globalLink + productAsin}?&language=en_US`,
      {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
          "sec-ch-ua-platform": "Windows",
          pragma: "no-cache",
          accept: "text/html,/",
          "x-requested-with": "XMLHttpRequest",
          host: "www.amazon.com",
        },
      }
    );
    const $ = cheerio.load(data);
    const productTitle = $("#productTitle").text().trim();
    const productImage = $("#landingImage").attr("src");
    let currentPrice = $(
      "#corePrice_feature_div > div > span > span.a-offscreen"
    ).text();
    if (!productTitle || !productImage) {
      res.status(404).json({ message: "Product not found" });
    }
    if (!currentPrice) {
      console.log("there is no price to display");
      currentPrice = $(
        "#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span > span.a-offscreen"
      )
        .first()
        .text();
    }
    if (!currentPrice) {
      console.log("there is no price to display the second option");
      // currentPrice = $(
      //   "#corePrice_desktop > div > table > tbody > tr > td.a-span12 > span.a-price.a-text-price.a-size-medium.apexPriceToPay > span:nth-child(2)"
      // ).text();
      currentPrice = $(
        "#corePrice_desktop > div > table > tbody > tr > td.a-span12 > span.a-price.a-text-price.a-size-medium.apexPriceToPay > span:nth-child(2)"
      )
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
      productTitle,
      productImage,
      currentPrice,
      targetPrice,
      productAsin,
    });
    console.log({
      productTitle,
      productLink,
      productImage,
      currentPrice,
    });
  } catch (error: any) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message, link: "link might not be found" });
  }
};

export const followProduct = async (req: Request, res: Response) => {
  const {
    productLink,
    targetPrice,
    productTitle,
    productImage,
    userId,
    productAsin,
    currentPrice,
  } = req.body;
  if (!productAsin || !targetPrice || !userId) {
    return res
      .status(404)
      .json({ message: "product asin or target price did not exist" });
  }

  try {
    // const user = await User.findById(userId);
    // if (!user) {
    //   return res.status(400).json({ message: "user does not exist" });
    // }
    const checkProduct = await Product.findOne({ productAsin: productAsin });
    if (checkProduct) {
      checkProduct.followers.push({ userId, targetPrice });
      checkProduct.currentPrice = currentPrice;
      checkProduct.lastUpdated = new Date();
      // user.products.push(checkProduct._id);
      const savedCheckProduct = await checkProduct.save();
      // const savedUser = await user.save();
      if (!savedCheckProduct) {
        return res.status(400).json({ message: "something went wrong" });
      }
      return res.status(201).json({
        message: "Following Product",
        followProduct: savedCheckProduct,
      });
    }
    //If product does not already gettting follow do this

    const newFollow = new Product({
      productAsin,
      title: productTitle,
      image: productImage,
      currentPrice,
      lastUpdated: new Date(),
      createdAt: new Date(),
    });

    newFollow.followers.push({ userId, targetPrice });

    // user.products.push(newFollow._id);
    const savedFollow = await newFollow.save();
    // const savedUser = await user.save();
    if (!savedFollow) {
      return res.status(400).json({ message: "something went wrong" });
    }
    return res
      .status(201)
      .json({ message: "Following Product", followProduct: savedFollow });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate(
      "followers.userId",
      "-password -role"
    );
    if (!products) {
      return res.status(404).json({ message: "Couldn't find products" });
    }
    res.status(200).json({ products });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const getUserProducts = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const products = await Product.find({
      "followers.userId": userId,
    }).populate("followers.userId", "-password -role");
    if (!products) {
      return res.status(404).json({ message: "Couldn't find products" });
    }
    res.status(200).json({ products });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const getSingleProduct = async (req: Request, res: Response) => {
  const { productAsin } = req.params;
  try {
    const singleProduct = await Product.findOne({
      productAsin: productAsin,
    }).populate("followers.userId", "-password -role");
    if (!singleProduct) {
      return res.status(404).json({ message: "Couldn't find product" });
    }
    res.status(200).json({ singleProduct });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category }).populate(
      "followers.userId",
      "-password -role"
    );
    if (!products) {
      return res.status(404).json({ message: "could not find " });
    }
    res.status(200).json({ products });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFollow = async (req: Request, res: Response) => {
  const { productId, userId } = req.body;
  if (!productId || !userId) {
    return res
      .status(400)
      .json({ message: " There is  No Product ID or userId" });
  }
  try {
    const unFolloweProduct = await Product.findById(productId);
    if (!unFolloweProduct) {
      return res.status(400).json({ message: "could not find product" });
    }
    unFolloweProduct.followers = unFolloweProduct.followers.filter(
      (objUser) => objUser.userId.toString() !== userId
    );
    // const savedUser = await user.save();
    if (!unFolloweProduct.followers.length) {
      const removeProduct = await Product.findByIdAndDelete(productId);
      if (!removeProduct) {
        return res.status(400).json({ message: "something went wrong" });
      }
      return res.status(200).json({ messgae: "unfollow product is completed" });
    }
    const savedProduct = unFolloweProduct.save();
    if (!savedProduct) {
      return res.status(401).json({ message: "could not unfollow product" });
    }
    res.status(200).json({ messgae: "unfollow product is completed" });
  } catch (error: any) {
    res.status(504).json({ message: error.message });
  }
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
