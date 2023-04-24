import { Request, Response } from "express";

//import colection schema
// const User = require("../models/users");
import User from "../models/users";

export const connectTelegram = async (req: Request, res: Response) => {
  try {
    const { telegramId, userId } = req.body;
    if (!telegramId || !userId)
      return res.status(401).json({ message: "need Telegram and user" });
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { telegramId: telegramId },
      { new: true }
    );
    if (!updatedUser)
      return res.status(401).json({ message: "could not find user" });
    res.status(200).json({ message: "user updated", updatedUser });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message, erreeee: "someth9ihng went wrong " });
  }
};
export const removeTelegramId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(401).json({ message: "need  user" });
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { telegramId: "" },
      { new: true }
    );
    if (!updatedUser)
      return res.status(401).json({ message: "could not find user" });
    res.status(200).json({ message: "user updated", updatedUser });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message, erreeee: "someth9ihng went wrong " });
  }
};
