import TelegramBot from "node-telegram-bot-api";
import { globalLink } from "../controlers/productController";
import { IFollowUser, IProduct } from "./types";
import ReplyManager from "node-telegram-operation-manager";
require("dotenv").config();

// const reply =new ReplyManager.ReplyManager()

const telegramToken = process.env.BOT as string;

const bot = new TelegramBot(telegramToken, { polling: true });

export const activateBot = () => {
  //   bot.on("message", (msg) => {
  //     const chatId = msg.chat.id;

  //     // send a message to the chat acknowledging receipt of their message
  //     bot.sendMessage(chatId, "Received your message" + chatId);
  //   });
  bot.onText(/\/login/, (msg) => {
    console.log(msg);
    //check email address
    bot.sendMessage("chatID", "Please enter you email").then((sentMessage) => {
      bot.onReplyToMessage(
        sentMessage.chat.id,
        sentMessage.message_id,
        (reply) => {
          console.log(reply);
        }
      );
    });
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
