import { Request, Response } from "express";
import User from "../models/users";
import Product from "../models/products";
import axios from "axios";
import cheerio from "cheerio";
import { json } from "stream/consumers";

export const verifyProduct = async (req: Request, res: Response) => {
  const { productLink, targetPrice } = req.body;
  if (!productLink) res.status(404).json({ message: "No link provided" });
  try {
    const { data } = await axios.get(productLink, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
        "sec-ch-ua-platform": "Windows",
        pragma: "no-cache",
        accept: "text/html,/",
        "x-requested-with": "XMLHttpRequest",
        host: "www.amazon.com",
      },
    });
    const $ = cheerio.load(data);
    const productTitle = $("#productTitle").text().trim();
    const productImage = $("#landingImage").attr("src");
    const currentPrice = $(
      "#corePrice_feature_div > div > span > span.a-offscreen"
    ).text();
    if (!productTitle || !productImage) {
      res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ productTitle, productImage, currentPrice, targetPrice });
    console.log({
      productTitle,
      productLink,
      productImage,
      currentPrice,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message, link: "link might not be found" });
    console.log(error);
  }
};

export const followProduct = async (req: Request, res: Response) => {
  const { productLink, targetPrice, productTitle, productImage, userId } =
    req.body;
  if (!productLink || !targetPrice) {
    return res
      .status(404)
      .json({ message: "product link or target price did not exist" });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "user does not exist" });
    }
    const checkProduct = await Product.findOne({ link: productLink });
    if (checkProduct) {
      checkProduct.followers.push(user._id);
      user.products.push(checkProduct._id);
      const savedCheckProduct = await checkProduct.save();
      const savedUser = await user.save();
      if (!savedCheckProduct || !savedUser) {
        return res.status(400).json({ message: "something went wrong" });
      }
      return res.status(201).json({
        message: "Following Product",
        followProduct: savedCheckProduct,
      });
    }

    const newFollow = new Product({
      link: productLink,
      targetPrice,
      title: productTitle,
      image: productImage,
      createdAt: new Date(),
    });

    newFollow.followers.push(user._id);
    user.products.push(newFollow._id);
    const savedFollow = await newFollow.save();
    const savedUser = await user.save();
    if (!savedFollow || !savedUser) {
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
    const products = await Product.find().populate("followers");
    if (!products) {
      return res.status(404).json({ message: "Couldn't find products" });
    }
    res.status(200).json({ products });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const getSingleProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const singleProduct = await Product.findOne({ _id: productId }).populate(
      "followers"
    );
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
    const products = await Product.find({ category }).populate("followers");
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
    return res.status(400).json({ message: " There is  No Product ID" });
  }
  try {
    const user = await User.findById(userId).populate("products");
    if (!user) {
      return res.status(400).json({ message: "user have not been found" });
    }

    user.products = user.products.filter(
      (obgId) => obgId._id.toString() !== productId
    );
    const unFolloweProduct = await Product.findById(productId).populate(
      "followers"
    );
    if (!unFolloweProduct) {
      return res.status(400).json({ message: "could not find product" });
    }
    unFolloweProduct.followers = unFolloweProduct.followers.filter(
      (objUser) => objUser._id.toString() !== userId
    );
    const savedUser = await user.save();
    if (!unFolloweProduct.followers.length) {
      const removeProduct = await Product.findByIdAndDelete(productId);
      if (!removeProduct) {
        return res.status(400).json({ message: "something went wrong" });
      }
    } else {
      const savedProduct = unFolloweProduct.save();
      if (!savedProduct) {
        return res.status(401).json({ message: "could not unfollow product" });
      }
    }
    if (!savedUser) {
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