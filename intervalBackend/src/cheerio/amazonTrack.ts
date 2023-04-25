import axios from "axios";
import cheerio from "cheerio";
import Product from "../models/products";
import { IProduct } from ".././types";
// import { globalLink } from "../../controlers/productController";
import { sendMessageBot } from "../telegramBot";
import { sendTrackEmail } from "../sendGridEmail";
export const globalLink = "https://www.amazon.com/dp/";
const setCurrentPriceAndDate = (productAsin: string, currentPrice: string) => {
  try {
    const product = Product.findOneAndUpdate(
      { productAsin },
      { currentPrice, lastUpdated: new Date() }
    );
    if (!product) return console.log("couldnt find product");
    console.log("product updated successful");
  } catch (error: any) {
    console.log(error.message);
  }
};

const isPriceLower = (wholePrice: string, targetProduct: IProduct) => {
  const { productAsin, followers, _id } = targetProduct;
  const currentPrice = wholePrice.replace("$", "");
  const numberCurrentPrice = parseInt(currentPrice);

  followers.forEach((follow) => {
    if (numberCurrentPrice < follow.targetPrice) {
      console.log(
        "price lower: " + numberCurrentPrice,
        " target: " + targetProduct.productAsin,
        "targetPrice: " + follow.targetPrice
      );
      sendMessageBot(targetProduct, follow, wholePrice);
      sendTrackEmail(targetProduct, follow, wholePrice);
    } else {
      console.log("price not lower: " + follow.targetPrice);
    }
  });
  setCurrentPriceAndDate(productAsin, currentPrice);
};
// let product:IProduct;

async function getProducts(targetProduct: IProduct) {
  const { productAsin, followers } = targetProduct;

  // const product = targetProduct;

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

  let previousPrice: string = "";
  let wholePrice: string = "";
  let precentageOff: string = "";
  const $ = cheerio.load(data);

  // first option price on sale

  let currentPrice: string = $(
    "#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-whole"
  ).text();
  if (currentPrice) {
    wholePrice = $(
      "#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2)"
    ).text();
    previousPrice = $(
      "#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-small.aok-align-center > span > span.a-size-small.a-color-secondary.aok-align-center.basisPrice > span > span:nth-child(2)"
    ).text();
    precentageOff = $(
      "#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-size-large.a-color-price.savingPriceOverride.aok-align-center.reinventPriceSavingsPercentageMargin.savingsPercentage"
    ).text();
    return isPriceLower(wholePrice, targetProduct);
  }

  //second optin price regular
  if (!currentPrice) {
    console.log("there is no price to display");
    currentPrice = $(
      "#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span > span:nth-child(2) > span.a-price-whole"
    ).text();
    wholePrice = $(
      "#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span > span:nth-child(2)"
    ).text();
  }
  if (wholePrice) {
    return isPriceLower(wholePrice, targetProduct);
  }

  //third option price is wierd
  if (!currentPrice) {
    console.log("there is no price to display the second option");
    // currentPrice = $(
    //   "#corePrice_desktop > div > table > tbody > tr > td.a-span12 > span.a-price.a-text-price.a-size-medium.apexPriceToPay > span:nth-child(2)"
    // ).text();
    wholePrice = $(
      "#corePrice_desktop > div > table > tbody > tr > td.a-span12 > span.a-price.a-text-price.a-size-medium.apexPriceToPay > span:nth-child(2)"
    ).text();
    if (!wholePrice) {
      wholePrice = $(
        "#corePrice_desktop > div > table > tbody > tr > td.a-span12 > span.a-price.a-text-price.a-size-medium.apexPriceToPay > span.a-offscreen"
      ).text();
    }
  }
  if (wholePrice) {
    return isPriceLower(wholePrice, targetProduct);
  }
  //product unavailable
  if (!currentPrice) {
    console.log("there is no price to display the third option");
    currentPrice = $("#availability > span").text().trim();
  }
  const num = parseInt(currentPrice);
  console.log({
    productAsin,
    currentPrice,
    num,
    wholePrice,
    previousPrice,
    precentageOff,
  });
  setCurrentPriceAndDate(productAsin, currentPrice);
}

async function promisses(productArray: IProduct[]) {
  const promises = productArray.map((element) => {
    return getProducts(element);
  });
  await Promise.all(promises);
}
export const getAmazonLinks = async () => {
  try {
    const products = await Product.find().populate("followers.userId");
    if (!products) {
      return "has been error finding products links";
    }

    const halfLength = Math.ceil(products.length / 2);
    const firstHalfIndex = 0;
    const secondHalfIndex = halfLength;

    // const promises = products.map((element) => {
    //   return getProducts(element);
    // });
    // await Promise.all(promises);

    promisses(products.slice(firstHalfIndex, secondHalfIndex));
    setTimeout(() => {
      promisses(products.slice(secondHalfIndex, products.length));
    }, 6 * 60 * 60 * 1000);
  } catch (e) {
    console.log(e);
  }
};
