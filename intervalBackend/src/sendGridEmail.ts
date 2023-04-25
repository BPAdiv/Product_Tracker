import sgMail from "@sendgrid/mail";
import { IFollowUser, IProduct } from "./types";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

interface sendTrackEmailP {
  targetProduct: IProduct;
  followUser: IFollowUser;
  wholePrice: string;
}

export const sendTrackEmail = (
  targetProduct: IProduct,
  followUser: IFollowUser,
  wholePrice: string
) => {
  let email: string | undefined;
  if ("email" in followUser.userId) {
    email = followUser.userId.email;
  } else {
    return "no telegram id";
  }
  const templateData = {
    productTitle: targetProduct.title,
    currentPrice: wholePrice,
    productAsin: targetProduct.productAsin,
    imgurl: targetProduct.image,
    imageUrl: targetProduct.image,
  };
  const msg = {
    // to: "gadolbarak@gmail.com", // Change to your recipient
    to: "bargainhiveapp@gmail.com", // Change to your recipient
    from: "bargainhiveapp@gmail.com", // Change to your verified sender
    // text: "and easy to do anywhere, even with Node.js",
    // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    templateId: "d-4715adf63a604122b43ca7330a2d98a9",
    dynamicTemplateData: templateData,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error: any) => {
      console.error(error.response.body);
    });
};
