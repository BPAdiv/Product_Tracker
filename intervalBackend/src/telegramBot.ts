import TelegramBot from "node-telegram-bot-api";
// import { globalLink } from "../controlers/productController";
import { IFollowUser, IProduct } from "./types";

import User from "./models/users";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

require("dotenv").config();
export const globalLink = "https://www.amazon.com/dp/";
const telegramToken = process.env.BOT as string;

const bot = new TelegramBot(telegramToken, { polling: true });

interface UserContext {
  state?: string;
  link?: string;
}

const context: { [key: number]: UserContext } = {};
export const activateBot = () => {
  bot
    .setWebHook(process.env.WEBHOOK_URL as string)
    .then(() => {
      console.log("Webhook set up successfully");
    })
    .catch((error) => {
      console.error("Error setting up webhook:", error);
    });
  bot.setMyCommands([
    { command: "/help", description: "help " },
    { command: "/newtrack", description: "Add new track" },
    { command: "/list", description: "See tracks " },
    { command: "/remove", description: "remove track " },
  ]);
  // Listen for the /start command
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const message = `Welcome to my bot! Here are the available commands:\n
/help - Show description and commands again.
/newtrack - Add a new product link to the tracking list.
/list - List all products in the tracking list.
/remove - Remove a product from the tracking list.`;
    bot.sendMessage(chatId, message);
  });

  // Listen for the /addnewtrack command
  bot.onText(/\/newtrack/, (msg) => {
    const chatId = msg.chat.id;
    const message =
      "Please enter your product link, example (www.amazon.com/dp/DAD12D3). You can copy the URL and paste it here.";
    bot.sendMessage(chatId, message);
    // Set the user's state to "addingNewProduct"
    context[msg.chat.id] = { state: "addingNewProduct" };
  });

  // Listen for the /list command
  bot.onText(/\/list/, (msg) => {
    const chatId = msg.chat.id;
    // Get the list of products from the tracking list
    // ...
    const message = "Here are the products currently being tracked:\n";
    //    + productList.join('\n');
    bot.sendMessage(chatId, message);
  });

  // Listen for the /remove command
  bot.onText(/\/remove/, (msg) => {
    const chatId = msg.chat.id;
    const message =
      "Please enter the product ID you want to remove, example (1). You can find the ID in the /list command.";
    bot.sendMessage(chatId, message);
    // Set the user's state to "removingProduct"
    context[msg.chat.id] = { state: "removingProduct" };
  });
  bot.on("message", (msg) => console.log(msg));

  // Listen for all messages
  bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    if (!text) return;
    // Check if the user is currently adding a new product
    if (context[chatId] && context[chatId].state === "addingNewProduct") {
      const linkRegex = /^www\.amazon\.com\/(dp|gp\/product)\/[A-Z0-9]+$/i;
      if (!text.match(linkRegex)) {
        // The message is not a valid product link
        bot.sendMessage(
          chatId,
          "Wrong input. Please enter a valid Amazon product link."
        );
      } else {
        // The message is a valid product link
        // Add the product to the tracking list
        // ...
        bot.sendMessage(chatId, "Product has been added to the tracking list!");
      }
      // Reset the user's state
      delete context[chatId];
    } else if (context[chatId] && context[chatId].state === "removingProduct") {
      const idRegex = /^[0-9]+$/;
      if (!text.match(idRegex)) {
        // The message is not a valid product ID
        bot.sendMessage(
          chatId,
          "Wrong input. Please enter a valid product ID."
        );
      } else {
        // The message is a valid product ID
        // Remove the product from the tracking list
        // ...
        bot.sendMessage(
          chatId,
          "Product has been removed from the tracking list!"
        );
      }
      // Reset
      delete context[chatId];
    } else if (text === "/help") {
      // The message is the /help command
      const message = `Welcome to my bot! Here are the available commands:\n
/help - Show description and commands again.
/newtrack - Add a new product link to the tracking list.
/list - List all products in the tracking list.
/remove - Remove a product from the tracking list.`;
      bot.sendMessage(chatId, message);
    }
  });
};
export const sendMessageBot = (
  targetProduct: IProduct,
  followUser: IFollowUser,
  wholePrice: string
) => {
  const { targetPrice } = followUser;
  let telegramId: string | undefined;
  if ("telegramId" in followUser.userId) {
    telegramId = followUser.userId.telegramId;
  } else {
    return "no telegram id";
  }
  if (!targetProduct.image) {
    return "no product image";
  }

  bot.sendPhoto(telegramId, targetProduct.image, {
    caption:
      `<b>SALE!!</b> \n` +
      `${targetProduct.title} \n 
      The current price is : <b>${wholePrice}</b>\n 
      dont miss your chance click below to buy\n
      <a href=\"${globalLink + targetProduct.productAsin}\">${
        globalLink + targetProduct.productAsin
      }</a> \n
      Your chat Id is ${telegramId} \n
      Your target price is : ${targetPrice}
      `,
    parse_mode: "HTML",
  });
};
