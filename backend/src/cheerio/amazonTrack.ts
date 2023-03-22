import axios from "axios";
import cheerio from "cheerio";
import products from "../../models/products";
import Product from "../../models/products";
import { IProduct } from ".././types";

// let product:IProduct;

async function getProducts(targetProduct: IProduct) {
  const { link, targetPrice } = targetProduct;

  const product: IProduct = targetProduct;
  const { data } = await axios.get(
    "https://www.amazon.com/-/he/yesbeaut-%D7%9E%D7%A7%D7%9C%D7%93%D7%AA-%D7%92%D7%99%D7%99%D7%9E%D7%99%D7%A0%D7%92-%D7%90%D7%97%D7%95%D7%A8%D7%99%D7%AA-%D7%9E%D7%95%D7%9C%D7%98%D7%99%D7%9E%D7%93%D7%99%D7%94/dp/B09YRBD8TM/ref=sr_1_8?crid=3NAIE6V1L9AC8&keywords=keyboard&qid=1679495825&sprefix=keyboa%2Caps%2C207&sr=8-8",
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
  const currentPrice: string = $(
    "#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-whole"
  ).text();
  const num = parseInt(currentPrice);
  console.log({ link, currentPrice, num });
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
