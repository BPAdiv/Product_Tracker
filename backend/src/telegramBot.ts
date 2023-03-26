import TelegramBot from "node-telegram-bot-api";
import { globalLink } from "../controlers/productController";
import { IFollowUser, IProduct } from "./types";
import ReplyManager from "node-telegram-operation-manager";
import User from "../models/users";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

require("dotenv").config();

// const reply =new ReplyManager.ReplyManager()

const telegramToken = process.env.BOT as string;

const bot = new TelegramBot(telegramToken, { polling: true });
// const webhookUrl = "http://localhost:8000/webhook"; // choose a URL for your webhook endpoint

// bot.setWebHook(webhookUrl);

export const activateBot = async () => {
  bot.onText(/\/start/, async (msg) => {
    if (msg.from && msg.text) {
      const telegramId = msg.from.id;
      const splitParams = msg.text.split("_");
      const token = splitParams[1].split("token=")[1];
      const source = splitParams[2].split("source=")[1];
      console.log(source, token);
      if (!token && !source) {
        return bot.sendMessage(
          telegramId,
          "Try using the website link instead"
        );
      }
      //check the token and find user by id and update telegramId as ${telegramId}
      try {
        const decoded = jwt.verify(token, process.env.JWT_ || "");
        // return console.log(decoded);
        if (!decoded && source !== "website") {
          return console.log({ message: "Invalid Token or User Id" });
        }
        const user = await User.findByIdAndUpdate(
          (decoded as { id: string }).id,
          {
            telegramId: telegramId,
          },
          { new: true }
        );
        if (!user)
          return bot.sendMessage(
            telegramId,
            "pls login to the website and try again"
          );
        bot.sendMessage(telegramId, "Telegram is connected to your account");
      } catch (error: any) {
        console.log(error.message);
      }
    }

    //check email address
    // bot.sendMessage("chatID", "Please enter you email").then((sentMessage) => {
    //   // bot.onReplyToMessage(
    //   //   sentMessage.chat.id,
    //   //   sentMessage.message_id,
    //   //   (reply) => {
    //   //     console.log(reply);
    //   //   }
    //   // );
    // });
    // reply.register("1412063297",(result)=>{

    // });
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
  //   bot.sendMessage(
  //     telegramId,
  //     `Received your message the price now is ${wholePrice} and your target price is ${targetPrice} ` +
  //       "chat id is " +
  //       telegramId
  //   );
};
