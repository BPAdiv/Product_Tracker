"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTrackEmail = void 0;
var mail_1 = __importDefault(require("@sendgrid/mail"));
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
var sendTrackEmail = function (targetProduct, followUser, wholePrice) {
    var email;
    if ("email" in followUser.userId) {
        email = followUser.userId.email;
    }
    else {
        return "no telegram id";
    }
    var templateData = {
        productTitle: targetProduct.title,
        currentPrice: wholePrice,
        productAsin: targetProduct.productAsin,
        imgurl: targetProduct.image,
        imageUrl: targetProduct.image,
    };
    var msg = {
        // to: "gadolbarak@gmail.com", // Change to your recipient
        to: "bargainhiveapp@gmail.com",
        from: "bargainhiveapp@gmail.com",
        // text: "and easy to do anywhere, even with Node.js",
        // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
        templateId: "d-4715adf63a604122b43ca7330a2d98a9",
        dynamicTemplateData: templateData,
    };
    mail_1.default
        .send(msg)
        .then(function () {
        console.log("Email sent");
    })
        .catch(function (error) {
        console.error(error.response.body);
    });
};
exports.sendTrackEmail = sendTrackEmail;
