import TelegramBot from "node-telegram-bot-api";
// import { globalLink } from "../controlers/productController";
import { IFollowUser, IProduct, IUser } from "./types";
import { format } from "timeago.js";
import User from "./models/users";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { Message } from "node-telegram-bot-api";
import axios from "axios";
import { data } from "cheerio/lib/api/attributes";

require("dotenv").config();
export const globalLink = "https://www.amazon.com/dp/";
const telegramToken = process.env.BOT as string;

const bot = new TelegramBot(telegramToken, { polling: true });

const checkIfUserConnected = async (
  telegramId: string | number
): Promise<IUser | boolean> => {
  console.log(typeof telegramId);
  try {
    const user = await User.findOne({ telegramId: telegramId.toString() });
    if (!user) return false;
    console.log(user);
    return user as IUser;
  } catch (error) {
    console.log(error);
    return false;
  }
};
const userNotLoggedIn = (msg: Message) => {
  bot.sendMessage(msg.chat.id, "Welcome", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Login", callback_data: "login" }],
        [{ text: "Sign Up", callback_data: "signup" }],
      ],
    },
  });

  bot.on("callback_query", (callbackQuery) => {
    const message = callbackQuery.message;
    const data = callbackQuery.data;
    if (!message) return;
    bot.sendMessage(message.chat.id, `You clicked the ${data} button`);
    if (data === "login") {
      context[msg.chat.id].state = "loginin";
      context[msg.chat.id].step = 1;
      bot.sendMessage(message.chat.id, `To log in Please Enter Your Email`);
    }
    if (data === "signup") {
      context[msg.chat.id].state = "signup";
      context[msg.chat.id].step = 1;
      bot.sendMessage(
        message.chat.id,
        `To sign up you will be required to enter email , password and userName`
      );
      bot.sendMessage(message.chat.id, `Please enter your email`);
    }
  });
};

interface ITempProduct {
  productLink: string;
  targetPrice: number;
  productTitle: string;
  productImage: string;
  userId: string;
  productAsin: string;
  currentPrice: string;
}
interface UserContext {
  state?: string;
  link?: string;
  step?: number;
  email?: string;
  password?: string;
  userName?: string;
  isConnected?: IUser | boolean;
  verifyProduct?: {
    targetPrice: number | undefined;
    productLink: string | undefined;
  };
  tempProduct?: ITempProduct;
}

const context: { [key: number]: UserContext } = {};

export const activateBot = () => {
  bot;
  // .setWebHook(process.env.WEBHOOK_URL as string)
  // .then(() => {
  //   console.log("Webhook set up successfully");
  // })
  // .catch((error) => {
  //   console.error("Error setting up webhook:", error);
  // });
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
  bot.onText(/\/newtrack/, async (msg) => {
    const chatId = msg.chat.id;
    const userChecked = await checkIfUserConnected(chatId);
    console.log(userChecked);

    if (!userChecked) {
      context[msg.chat.id] = { state: "userNot" };
      return userNotLoggedIn(msg);
    }
    // context[chatId].isConnected = userChecked;
    const message =
      "Please enter your product link, example (www.amazon.com/dp/DAD12D3). You can copy the URL and paste it here.";
    bot.sendMessage(chatId, message);
    // Set the user's state to "addingNewProduct"
    context[msg.chat.id] = {
      state: "addingNewProduct",
      isConnected: userChecked,
      step: 1,
    };
  });

  // Listen for the /list command
  bot.onText(/\/list/, async (msg) => {
    const chatId = msg.chat.id;
    const userChecked = await checkIfUserConnected(chatId);
    if (!userChecked) {
      context[msg.chat.id] = { state: "userNot" };
      return userNotLoggedIn(msg);
    }
    context[chatId] = { isConnected: userChecked };
    // Get the list of products from the tracking list
    // ...
    if (typeof userChecked === "boolean" || userChecked === undefined) {
      return console.log(userChecked);
    }

    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/product/user/${userChecked._id}`
      );
      console.log(data);

      const message = "Here are the products currently being tracked:\n";
      //    + productList.join('\n');
      bot.sendMessage(chatId, message);

      data.products.forEach((pro: IProduct) => {
        if (!pro.image) return;
        bot.sendPhoto(chatId, pro.image, {
          caption: `${pro.title} \n 
The current price is : <b>${pro.currentPrice}</b>\n 
${pro.lastUpdated && `Last updated: ${format(pro?.lastUpdated)}`}
              `,
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [{ text: "Amazon Link", url: globalLink + pro.productAsin }],
            ],
          },
        });
      });
    } catch (error) {
      console.log(error);
      bot.sendMessage(chatId, "sry it has been an error");
    }
  });

  // Listen for the /remove command
  bot.onText(/\/remove/, async (msg) => {
    const chatId = msg.chat.id;
    const userChecked = await checkIfUserConnected(chatId);
    if (!userChecked) {
      context[msg.chat.id] = { state: "userNot" };
      return userNotLoggedIn(msg);
    }

    const message =
      "Please enter the product ID you want to remove, example (1). You can find the ID in the /list command.";
    bot.sendMessage(chatId, message);
    // Set the user's state to "removingProduct"
    context[msg.chat.id] = {
      state: "removingProduct",
      isConnected: userChecked,
    };
  });
  bot.on("message", (msg) => console.log(msg));

  // Listen for all messages
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    let userId: IUser | undefined | boolean;
    if (context[chatId] && context[chatId].isConnected) {
      userId = context[chatId].isConnected;
    }
    if (!text) return;
    // Check if the user is currently adding a new product
    if (context[chatId] && context[chatId].state === "addingNewProduct") {
      if (typeof userId === "boolean" || userId === undefined) {
        return bot.sendMessage(chatId, "No user found ");
      }
      if (context[chatId].step === 1) {
        context[chatId].verifyProduct = {
          productLink: text,
          targetPrice: undefined,
        };
        context[chatId].step = 2;
        bot.sendMessage(chatId, "Please enter your target price");
      } else if (context[chatId].step === 2) {
        const targetPrice = Number(text);
        if (typeof targetPrice !== "number" && isNaN(targetPrice)) {
          return bot.sendMessage(chatId, "please use only numbers 0-9");
        }
        const proLink = context[chatId].verifyProduct?.productLink;
        context[chatId].verifyProduct = { targetPrice, productLink: proLink };
        context[chatId].step = 2;
        try {
          const { data } = await axios.post(
            "http://localhost:8000/api/product/verifyProduct",
            {
              targetPrice: context[chatId].verifyProduct?.targetPrice,
              productLink: context[chatId].verifyProduct?.productLink,
            }
          );
          console.log(data);
          const tempPrice = data.targetPrice;
          data.userId = userId;
          delete data.targetPrice;
          context[chatId].tempProduct = data;
          context[chatId].step = 3;
          bot.sendMessage(chatId, "Please confirm if this is your product", {
            reply_markup: {
              inline_keyboard: [
                [{ text: "Yes", callback_data: "confirmed" }],
                [{ text: "No", callback_data: "NotConfirmed" }],
              ],
            },
          });
        } catch (error: any) {
          console.log(error);
          bot.sendMessage(chatId, "Error");
          delete context[chatId];
        }
      } else if (context[chatId].step === 3) {
        bot.on("callback_query", async (callbackQuery) => {
          const message = callbackQuery.message;
          const data = callbackQuery.data;

          if (data === "NotConfirmed") {
            delete context[chatId];
            return bot.sendMessage(chatId, "Ok Not Confirmed");
          }
          try {
            const { data } = await axios.post(
              "http://localhost:8000/api/product/followProduct",
              context[chatId].tempProduct
            );
            console.log(data);
            bot.sendMessage(chatId, "Success");
          } catch (error) {
            console.log(error);
            bot.sendMessage(chatId, "Error");
          }
        });
        delete context[chatId];
      }

      //
      // const linkRegex = /^www\.amazon\.com\/(dp|gp\/product)\/[A-Z0-9]+$/i;
      // if (!text.match(linkRegex)) {
      //   // The message is not a valid product link
      //   bot.sendMessage(
      //     chatId,
      //     "Wrong input. Please enter a valid Amazon product link."
      //   );
      // } else {
      //   bot.sendMessage(chatId, "Product has been added to the tracking list!");
      // }
      // Reset the user's state
    } else if (context[chatId] && context[chatId].state === "removingProduct") {
      // const idRegex = /^[0-9]+$/;
      // if (!text.match(idRegex)) {
      //   // The message is not a valid product ID
      //   bot.sendMessage(
      //     chatId,
      //     "Wrong input. Please enter a valid product ID."
      //   );
      // } else {
      // The message is a valid product ID
      // Remove the product from the tracking list
      // ...
      if (typeof userId === "boolean" || userId === undefined) {
        return console.log(userId);
      }
      try {
        const { data } = await axios.post(
          "http://localhost:8000/api/product/unfollow",
          { userId: userId._id, productId: msg.text }
        );
        console.log(data);
        bot.sendMessage(
          chatId,
          "Product has been removed from the tracking list!"
        );
      } catch (error) {
        console.log(error);
        bot.sendMessage(chatId, "error pls try again");
      }
      // }
      // Reset
      delete context[chatId];
    } else if (context[chatId] && context[chatId].state === "loginin") {
      if (context[chatId].step === 1) {
        context[chatId].email = msg.text;
        context[chatId].step = 2;
        bot.sendMessage(chatId, "Please enter password");
      } else if (context[chatId].step === 2) {
        context[chatId].password = msg.text;
        //do axios login check
        console.log(context[chatId]);
        try {
          const { data } = await axios.post(
            "http://localhost:8000/api/user/login",
            {
              email: context[chatId].email,
              password: context[chatId].password,
            }
          );
          console.log(data);
          bot.sendMessage(chatId, "You are logged in");
        } catch (error: any) {
          console.log(error.response);
          bot.sendMessage(chatId, "It has been an error try again");
        }
        delete context[chatId];
      }
    } else if (context[chatId] && context[chatId].state === "signup") {
      if (context[chatId].step === 1) {
        context[chatId].email = msg.text;
        context[chatId].step = 2;
        bot.sendMessage(chatId, "Please enter password");
      } else if (context[chatId].step === 2) {
        context[chatId].password = msg.text;
        context[chatId].step = 3;
        bot.sendMessage(chatId, "Please enter userName");
      } else if (context[chatId].step === 3) {
        context[chatId].userName = msg.text;
        //do axios login check
        console.log(context[chatId]);
        try {
          const { data } = await axios.post(
            "http://localhost:8000/api/user/signup",
            {
              email: context[chatId].email,
              password: context[chatId].password,
              userName: context[chatId].userName,
            }
          );
          console.log(data);
          bot.sendMessage(chatId, "Account created success");
        } catch (error: any) {
          console.log(error.response);
          bot.sendMessage(chatId, "It has been an error try again");
        }
        delete context[chatId];
      }
    } else if (text === "/help") {
      // The message is the /help command
      const message = `Welcome to my bot! Here are the available commands:\n
/help - Show description and commands again.
/newtrack - Add a new product link to the tracking list.
/list - List all products in the tracking list.
/remove - Remove a product from the tracking list.`;
      bot.sendMessage(chatId, message);
    }
    //  else if (!context[chatId]) {
    //   context[msg.chat.id] = { state: "userNot" };
    //   userNotLoggedIn(msg);
    // }
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
