import axios from "axios";
import cheerio from "cheerio";
import products from "../../models/products";
import Product from "../../models/products";
import { IProduct } from ".././types";
import { globalLink } from "../../controlers/productController";
// let product:IProduct;

async function getProducts(targetProduct: IProduct) {
  const { productAsin, followers } = targetProduct;

  const product: IProduct = targetProduct;
  const { data } = await axios.get(globalLink + "B07PXGQC1Q", {
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
}

export const getAmazonLinks = async () => {
  try {
    const products = await Product.find();
    if (!products) {
      return "has been error finding products links";
    }
    const promises = products.map((element: IProduct) => {
      return getProducts(element);
    });
    await Promise.all(promises);
  } catch (e) {
    console.log(e);
  }
};
