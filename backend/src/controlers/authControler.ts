import { Request, Response } from "express";

//import colection schema
// const User = require("../models/users");
import User from "../models/users";
import bcrypt from "bcrypt";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, userName } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hash, userName });
    const savedUser = await newUser.save();
    if (!savedUser)
      return res.status(400).json({ message: "User already exist" });
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_ as string);
    res.status(201).json({ message: "user created", data: savedUser, token });
  } catch (error: any) {
    res.status(500).json({ message: error.message, erreeee: "errorsss" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const loginUser = await User.findOne({ email: req.body.email });
    if (!loginUser)
      return res.status(400).json({ message: "User does not exist" });
    const bycryptPassword = await bcrypt.compare(
      req.body.password,
      loginUser.password
    );
    if (!bycryptPassword)
      return res.status(400).json({ message: "Invalid password or email" });
    const token = jwt.sign({ id: loginUser._id }, process.env.JWT_ as string);
    res.status(200).json({ message: "You are In", data: loginUser, token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// export const verfiyToken = async (req: Request, res: Response) => {
//   const token = req.body.token;
//   const userId = req.body.userId;

//   try {
//     if (!token || !userId)
//       return res.status(400).json({ message: "Token or User Id is missing" });

//     const decoded = jwt.verify(token, process.env.JWT_ || "");

//     if ((decoded as { id: string }).id != userId)
//       return res.status(400).json({ message: "Invalid Token or User Id" });
//     const user = await User.findById(userId);
//     if (!user) return res.status(400).json({ message: "User does not exist" });
//     res.status(200).json({ data: user });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };
const checkToken = async (token: string) => {
  try {
    if (!token) return;
    const decoded = jwt.verify(token, process.env.JWT_ || "");
    if (!(decoded as { id: string }).id) return;

    // const { email } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById((decoded as { id: string }).id);
    if (!user) return;
    return user;
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      console.log("Token expired");
    } else {
      console.error(err);
    }
  }
};
export const verfiyToken = async (req: Request, res: Response) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const user = await checkToken(token);

    // If the user is not found, return a 401 status
    if (!user) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    // If the user is found, return the user data
    // const { username, admin } = user;
    // const { rows: rows3 } = await db.query(`SELECT * FROM favorite WHERE owner = $1`, [
    //   username,
    // ]);

    res.status(200).json({ user });
  } catch (error) {
    // If the token is invalid, return a 401 status
    return res.status(401).send({ message: "Unauthorized" });
  }
};
export const contactUsEmail = async (req: Request, res: Response) => {
  const { email, subject, emailContent } = req.body;
  const msg = {
    to: "bargainhiveapp@gmail.com",
    from: "bargainhiveapp@gmail.com", // Use the email address or domain you verified above
    subject: `Contact Us from ${email} ${subject}`,
    text: emailContent,
    html: `<p>${emailContent}</p>`,
  };

  try {
    const mail = await sgMail.send(msg);

    return res.status(200).json({ message: "success", mail });
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.body);
      res.status(500).json({ message: error.message, erreeee: "errorsss" });
    }
  }
};
