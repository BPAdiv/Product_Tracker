"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var timeago_js_1 = require("timeago.js");
var users_1 = __importDefault(require("./models/users"));
var axios_1 = __importDefault(require("axios"));
require("dotenv").config();
exports.globalLink = "https://www.amazon.com/dp/";
var telegramToken = process.env.BOT;
var bot = new node_telegram_bot_api_1.default(telegramToken, { polling: true });
var context = {};
var checkIfUserConnected = function (telegramId) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(typeof telegramId);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, users_1.default.findOne({ telegramId: telegramId.toString() })];
            case 2:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, false];
                console.log(user);
                return [2 /*return*/, user];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, false];
            case 4: return [2 /*return*/];
        }
    });
}); };
var userNotLoggedIn = function (msg) {
    bot.sendMessage(msg.chat.id, "Welcome To Bot", {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Login", callback_data: "login" }],
                [{ text: "Sign Up", callback_data: "signup" }],
            ],
        },
    });
};
var isValidEmail = function (email) {
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};
var activateBot = function () {
    // bot;
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
    var handleAddingNewProductState = function (chatId, text, userId) { return __awaiter(void 0, void 0, void 0, function () {
        var stateStep, _a, targetPrice, proLink, data_1, error_2;
        var _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (typeof userId === "boolean" || userId === undefined) {
                        delete context[chatId];
                        return [2 /*return*/, bot.sendMessage(chatId, "No user found ")];
                    }
                    stateStep = context[chatId].step;
                    _a = stateStep;
                    switch (_a) {
                        case 1: return [3 /*break*/, 1];
                        case 2: return [3 /*break*/, 2];
                    }
                    return [3 /*break*/, 7];
                case 1:
                    context[chatId].verifyProduct = {
                        productLink: text,
                    };
                    context[chatId].step = 2;
                    bot.sendMessage(chatId, "Please enter your target price");
                    return [3 /*break*/, 8];
                case 2:
                    targetPrice = Number(text);
                    console.log(targetPrice);
                    if (typeof targetPrice !== "number" || isNaN(targetPrice)) {
                        return [2 /*return*/, bot.sendMessage(chatId, "please try again and  use only numbers between 0-9")];
                    }
                    proLink = (_b = context[chatId].verifyProduct) === null || _b === void 0 ? void 0 : _b.productLink;
                    context[chatId].verifyProduct = { targetPrice: targetPrice, productLink: proLink };
                    context[chatId].step = 2;
                    _f.label = 3;
                case 3:
                    _f.trys.push([3, 5, , 6]);
                    bot.sendMessage(chatId, "Searching...");
                    return [4 /*yield*/, axios_1.default.post("http://localhost:8000/api/product/verifyProduct", {
                            targetPrice: (_c = context[chatId].verifyProduct) === null || _c === void 0 ? void 0 : _c.targetPrice,
                            productLink: (_d = context[chatId].verifyProduct) === null || _d === void 0 ? void 0 : _d.productLink,
                        })];
                case 4:
                    data_1 = (_f.sent()).data;
                    console.log(data_1);
                    data_1.userId = userId._id.toString();
                    data_1.productLink = (_e = context[chatId].verifyProduct) === null || _e === void 0 ? void 0 : _e.productLink;
                    context[chatId].tempProduct = __assign({}, data_1);
                    context[chatId].step = 3;
                    bot.sendMessage(chatId, "Please confirm if this is your product", {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: "Yes", callback_data: "confirmed" }],
                                [{ text: "No", callback_data: "NotConfirmed" }],
                            ],
                        },
                    });
                    return [3 /*break*/, 6];
                case 5:
                    error_2 = _f.sent();
                    console.log(error_2);
                    bot.sendMessage(chatId, "Error try again");
                    delete context[chatId];
                    return [3 /*break*/, 6];
                case 6: return [3 /*break*/, 8];
                case 7:
                    bot.sendMessage(chatId, "Wrong Input try again");
                    delete context[chatId];
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    var handleRemovingProductsState = function (chatId, text, userId) { return __awaiter(void 0, void 0, void 0, function () {
        var data_2, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof userId === "boolean" || userId === undefined) {
                        return [2 /*return*/, console.log(userId)];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.post("http://localhost:8000/api/product/unfollow", { userId: userId._id, productId: text })];
                case 2:
                    data_2 = (_a.sent()).data;
                    console.log(data_2);
                    bot.sendMessage(chatId, "Product has been removed from the tracking list!");
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.log(error_3);
                    bot.sendMessage(chatId, "error pls try again");
                    return [3 /*break*/, 4];
                case 4:
                    // }
                    // Reset
                    delete context[chatId];
                    return [2 /*return*/];
            }
        });
    }); };
    var handleLogininState = function (chatId, text, userId) { return __awaiter(void 0, void 0, void 0, function () {
        var data_3, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(context[chatId].step === 1)) return [3 /*break*/, 1];
                    if (!isValidEmail(text)) {
                        bot.sendMessage(chatId, "Please enter a valid email");
                        return [2 /*return*/];
                    }
                    context[chatId].email = text;
                    context[chatId].step = 2;
                    bot.sendMessage(chatId, "Please enter password");
                    return [3 /*break*/, 6];
                case 1:
                    if (!(context[chatId].step === 2)) return [3 /*break*/, 6];
                    context[chatId].password = text;
                    //do axios login check
                    console.log(context[chatId]);
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, axios_1.default.post("http://localhost:8000/api/user/login", {
                            email: context[chatId].email,
                            password: context[chatId].password,
                            telegramId: chatId.toString(),
                        })];
                case 3:
                    data_3 = (_a.sent()).data;
                    console.log(data_3);
                    bot.sendMessage(chatId, "You are logged in");
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    console.log(error_4.response);
                    bot.sendMessage(chatId, "It has been an error try again");
                    return [3 /*break*/, 5];
                case 5:
                    delete context[chatId];
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handleSignupState = function (chatId, text, userId) { return __awaiter(void 0, void 0, void 0, function () {
        var data_4, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(context[chatId].step === 1)) return [3 /*break*/, 1];
                    if (!isValidEmail(text)) {
                        bot.sendMessage(chatId, "Please enter a valid email");
                        return [2 /*return*/];
                    }
                    context[chatId].email = text;
                    context[chatId].step = 2;
                    bot.sendMessage(chatId, "Please enter password");
                    return [3 /*break*/, 7];
                case 1:
                    if (!(context[chatId].step === 2)) return [3 /*break*/, 2];
                    context[chatId].password = text;
                    context[chatId].step = 3;
                    bot.sendMessage(chatId, "Please enter userName");
                    return [3 /*break*/, 7];
                case 2:
                    if (!(context[chatId].step === 3)) return [3 /*break*/, 7];
                    context[chatId].userName = text;
                    //do axios login check
                    console.log(context[chatId]);
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, axios_1.default.post("http://localhost:8000/api/user/signup", {
                            email: context[chatId].email,
                            password: context[chatId].password,
                            userName: context[chatId].userName,
                            telegramId: chatId.toString(),
                        })];
                case 4:
                    data_4 = (_a.sent()).data;
                    console.log(data_4);
                    bot.sendMessage(chatId, "Account created success");
                    return [3 /*break*/, 6];
                case 5:
                    error_5 = _a.sent();
                    console.log(error_5.response);
                    bot.sendMessage(chatId, "It has been an error try again");
                    return [3 /*break*/, 6];
                case 6:
                    delete context[chatId];
                    _a.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var handleRandomMessage = function (chatId, text) {
        if (!["/help", "/start", "/newtrack", "/list", "/remove"].includes(text) &&
            !context[chatId]) {
            var message = "Welcome to my bot! Here are the available commands:\n\n/help - Show description and commands again.\n/newtrack - Add a new product link to the tracking list.\n/list - List all products in the tracking list.\n/remove - Remove a product from the tracking list.";
            bot.sendMessage(chatId, message);
        }
    };
    //listen to callback_query
    bot.on("callback_query", function (callbackQuery) { return __awaiter(void 0, void 0, void 0, function () {
        var message, data, data_5, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    message = callbackQuery.message;
                    data = callbackQuery.data;
                    console.log(message, data);
                    if (!message)
                        return [2 /*return*/];
                    bot.sendMessage(message.chat.id, "You clicked the ".concat(data, " button"));
                    if (!(data === "login" && context[message.chat.id].state === "userNot")) return [3 /*break*/, 1];
                    context[message.chat.id].state = "loginin";
                    context[message.chat.id].step = 1;
                    bot.sendMessage(message.chat.id, "You can write <b>/exit</b> to stop the process", { parse_mode: "HTML" });
                    bot.sendMessage(message.chat.id, "To log in Please Enter Your Email");
                    return [3 /*break*/, 8];
                case 1:
                    if (!(data === "signup" &&
                        context[message.chat.id].state === "userNot")) return [3 /*break*/, 2];
                    context[message.chat.id].state = "signup";
                    context[message.chat.id].step = 1;
                    bot.sendMessage(message.chat.id, "You can write <b>/exit</b> to stop the process", { parse_mode: "HTML" });
                    bot.sendMessage(message.chat.id, "To sign up you will be required to enter email , password and userName");
                    bot.sendMessage(message.chat.id, "Please enter your email");
                    return [3 /*break*/, 8];
                case 2:
                    if (!(data === "NotConfirmed" &&
                        context[message.chat.id].state === "addingNewProduct" &&
                        context[message.chat.id].step === 3)) return [3 /*break*/, 3];
                    delete context[message.chat.id];
                    return [2 /*return*/, bot.sendMessage(message.chat.id, "Ok Not Confirmed")];
                case 3:
                    if (!(data === "confirmed" &&
                        context[message.chat.id].state === "addingNewProduct" &&
                        context[message.chat.id].step === 3)) return [3 /*break*/, 8];
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, axios_1.default.post("http://localhost:8000/api/product/followProduct", context[message.chat.id].tempProduct)];
                case 5:
                    data_5 = (_a.sent()).data;
                    console.log(data_5);
                    bot.sendMessage(message.chat.id, "Success");
                    return [3 /*break*/, 7];
                case 6:
                    error_6 = _a.sent();
                    console.log(error_6);
                    if (error_6.response.status === 405) {
                        bot.sendMessage(message.chat.id, "You are already following this product");
                    }
                    else {
                        bot.sendMessage(message.chat.id, "try again");
                    }
                    return [3 /*break*/, 7];
                case 7:
                    delete context[message.chat.id];
                    _a.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    }); });
    // Listen for the /start command
    bot.onText(/\/start/, function (msg) {
        var chatId = msg.chat.id;
        if (context[chatId])
            return;
        var message = "Welcome to my bot! Here are the available commands:\n\n/help - Show description and commands again.\n/newtrack - Add a new product link to the tracking list.\n/list - List all products in the tracking list.\n/remove - Remove a product from the tracking list.";
        bot.sendMessage(chatId, message);
    });
    //listen for the /help command
    bot.onText(/\/help/, function (msg) {
        var chatId = msg.chat.id;
        if (context[chatId])
            return;
        var message = "Welcome to my bot! Here are the available commands:\n\n/help - Show description and commands again.\n/newtrack - Add a new product link to the tracking list.\n/list - List all products in the tracking list.\n/remove - Remove a product from the tracking list.";
        bot.sendMessage(chatId, message);
    });
    // Listen for the /addnewtrack command
    bot.onText(/\/newtrack/, function (msg) { return __awaiter(void 0, void 0, void 0, function () {
        var chatId, userChecked, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    chatId = msg.chat.id;
                    if (context[chatId])
                        return [2 /*return*/];
                    return [4 /*yield*/, checkIfUserConnected(chatId)];
                case 1:
                    userChecked = _a.sent();
                    console.log(userChecked);
                    if (!userChecked) {
                        context[chatId] = { state: "userNot" };
                        return [2 /*return*/, userNotLoggedIn(msg)];
                    }
                    // context[chatId].isConnected = userChecked;
                    bot.sendMessage(chatId, "You can write <b>/exit</b> to stop the process", {
                        parse_mode: "HTML",
                    });
                    message = "Please enter your product link, example (www.amazon.com/dp/DAD12D3). You can copy the URL and paste it here.";
                    bot.sendMessage(chatId, message);
                    // Set the user's state to "addingNewProduct"
                    context[msg.chat.id] = {
                        state: "addingNewProduct",
                        isConnected: userChecked,
                        step: 1,
                    };
                    return [2 /*return*/];
            }
        });
    }); });
    // Listen for the /list command
    bot.onText(/\/list/, function (msg) { return __awaiter(void 0, void 0, void 0, function () {
        var chatId, userChecked, data_6, message, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    chatId = msg.chat.id;
                    if (context[chatId])
                        return [2 /*return*/];
                    return [4 /*yield*/, checkIfUserConnected(chatId)];
                case 1:
                    userChecked = _a.sent();
                    if (!userChecked) {
                        context[msg.chat.id] = { state: "userNot" };
                        return [2 /*return*/, userNotLoggedIn(msg)];
                    }
                    context[chatId] = { isConnected: userChecked };
                    // Get the list of products from the tracking list
                    // ...
                    if (typeof userChecked === "boolean" || userChecked === undefined) {
                        return [2 /*return*/, console.log(userChecked)];
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, axios_1.default.get("http://localhost:8000/api/product/user/".concat(userChecked._id))];
                case 3:
                    data_6 = (_a.sent()).data;
                    console.log(data_6);
                    message = "Here are the products currently being tracked:\n";
                    bot.sendMessage(chatId, message);
                    data_6.products.forEach(function (pro) {
                        if (!pro.image)
                            return;
                        var formatLastUpdated = pro.lastUpdated && (0, timeago_js_1.format)(new Date(pro === null || pro === void 0 ? void 0 : pro.lastUpdated));
                        bot.sendPhoto(chatId, pro.image, {
                            caption: "".concat(pro.title, " \n \nThe current price is : <b>").concat(pro.currentPrice, "</b>\n \n<div>").concat(pro.lastUpdated && "Last updated: ".concat(formatLastUpdated), "</div>\n              "),
                            parse_mode: "HTML",
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "Amazon Link", url: exports.globalLink + pro.productAsin }],
                                ],
                            },
                        });
                    });
                    return [3 /*break*/, 5];
                case 4:
                    error_7 = _a.sent();
                    console.log(error_7);
                    bot.sendMessage(chatId, "sry it has been an error");
                    return [3 /*break*/, 5];
                case 5:
                    delete context[chatId];
                    return [2 /*return*/];
            }
        });
    }); });
    // Listen for the /remove command
    bot.onText(/\/remove/, function (msg) { return __awaiter(void 0, void 0, void 0, function () {
        var chatId, userChecked, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    chatId = msg.chat.id;
                    if (context[chatId])
                        return [2 /*return*/];
                    return [4 /*yield*/, checkIfUserConnected(chatId)];
                case 1:
                    userChecked = _a.sent();
                    if (!userChecked) {
                        context[msg.chat.id] = { state: "userNot" };
                        return [2 /*return*/, userNotLoggedIn(msg)];
                    }
                    bot.sendMessage(chatId, "You can write <b>/exit</b> to stop the process", {
                        parse_mode: "HTML",
                    });
                    message = "Please enter the product ID you want to remove, example (1). You can find the ID in the /list command.";
                    bot.sendMessage(chatId, message);
                    // Set the user's state to "removingProduct"
                    context[msg.chat.id] = {
                        state: "removingProduct",
                        isConnected: userChecked,
                    };
                    return [2 /*return*/];
            }
        });
    }); });
    bot.on("message", function (msg) { return console.log(msg); });
    // Listen for all messages
    bot.on("message", function (msg) { return __awaiter(void 0, void 0, void 0, function () {
        var chatId, text, userId, userContextState;
        return __generator(this, function (_a) {
            chatId = msg.chat.id;
            text = msg.text;
            if (!text)
                return [2 /*return*/];
            userContextState = context[chatId] && context[chatId].state;
            if (text === "/exit" && userContextState) {
                delete context[chatId];
                bot.sendMessage(chatId, "You have exited the process");
                return [2 /*return*/];
            }
            if (context[chatId] && context[chatId].isConnected) {
                userId = context[chatId].isConnected;
            }
            switch (userContextState) {
                case "addingNewProduct":
                    handleAddingNewProductState(chatId, text, userId);
                    break;
                case "removingProduct":
                    handleRemovingProductsState(chatId, text, userId);
                    break;
                case "loginin":
                    handleLogininState(chatId, text, userId);
                    break;
                case "signup":
                    handleSignupState(chatId, text, userId);
                    break;
                default:
                    handleRandomMessage(chatId, text);
                    break;
            }
            return [2 /*return*/];
        });
    }); });
};
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
            "".concat(targetProduct.title, " \n \nThe current price is : <b>").concat(wholePrice, "</b>\n \ndont miss your chance click below to buy\n\n<a href=\"").concat(exports.globalLink + targetProduct.productAsin, "\">").concat(exports.globalLink + targetProduct.productAsin, "</a> \n\nYour chat Id is ").concat(telegramId, " \n\nYour target price is : ").concat(targetPrice, "\n      "),
        parse_mode: "HTML",
    });
};
exports.sendMessageBot = sendMessageBot;
