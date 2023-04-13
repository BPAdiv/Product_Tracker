"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageBot = exports.activateBot = exports.globalLink = void 0;
var node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
var users_1 = __importDefault(require("./models/users"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
exports.globalLink = "https://www.amazon.com/dp/";
var telegramToken = process.env.BOT;
var bot = new node_telegram_bot_api_1.default(telegramToken, { polling: true });
// bot
//   .setWebHook(`${process.env.SERVER_URL as string}/bot${telegramToken}`)
//   .then((res) => console.log(res))
//   .catch((error) => console.log(error));
bot.on("message", function (message) {
    console.log(message);
});
var activateBot = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        bot.onText(/\/start/, function (msg) { return __awaiter(void 0, void 0, void 0, function () {
            var telegramId, splitParams, token, source, decoded, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(msg.from && msg.text)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        telegramId = msg.from.id;
                        splitParams = msg.text.split("_");
                        token = splitParams[1].split("token=")[1];
                        source = splitParams[2].split("source=")[1];
                        console.log(source, token);
                        if (!token && !source) {
                            return [2 /*return*/, bot.sendMessage(telegramId, "Try using the website link instead")];
                        }
                        decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_ || "");
                        // return console.log(decoded);
                        if (!decoded && source !== "website") {
                            return [2 /*return*/, console.log({ message: "Invalid Token or User Id" })];
                        }
                        return [4 /*yield*/, users_1.default.findByIdAndUpdate(decoded.id, {
                                telegramId: telegramId,
                            }, { new: true })];
                    case 2:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, bot.sendMessage(telegramId, "pls login to the website and try again")];
                        bot.sendMessage(telegramId, "Telegram is connected to your account");
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.activateBot = activateBot;
var sendMessageBot = function (targetProduct, followUser, wholePrice) {
    var targetPrice = followUser.targetPrice;
    var telegramId;
    if ("telegramId" in followUser.userId) {
        telegramId = followUser.userId.telegramId;
    }
    else {
        return "no telegram id";
    }
    if (!targetProduct.image) {
        return "no product image";
    }
    bot.sendPhoto(telegramId, targetProduct.image, {
        caption: "<b>SALE!!</b> \n" +
            "".concat(targetProduct.title, " \n \n      The current price is : <b>").concat(wholePrice, "</b>\n \n      dont miss your chance click below to buy\n\n      <a href=\"").concat(exports.globalLink + targetProduct.productAsin, "\">").concat(exports.globalLink + targetProduct.productAsin, "</a> \n\n      Your chat Id is ").concat(telegramId, " \n\n      Your target price is : ").concat(targetPrice, "\n      "),
        parse_mode: "HTML",
    });
    //   bot.sendMessage(
    //     telegramId,
    //     `Received your message the price now is ${wholePrice} and your target price is ${targetPrice} ` +
    //       "chat id is " +
    //       telegramId
    //   );
};
exports.sendMessageBot = sendMessageBot;
