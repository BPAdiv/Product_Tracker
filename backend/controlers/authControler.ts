import { Request, Response } from "express";

//import colection schema
// const User = require("../models/users");
import User from "../models/users";
import bcrypt from "bcrypt";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

exports.register = async (req: Request, res: Response) => {
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

exports.login = async (req: Request, res: Response) => {
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

exports.verfiyToken = async (req: Request, res: Response) => {
  const token = req.body.token;
  const userId = req.body.userId;

  try {
    if (!token || !userId)
      return res.status(400).json({ message: "Token or User Id is missing" });

    const decoded = jwt.verify(token, process.env.JWT || "");

    if ((decoded as { id: string }).id != userId)
      return res.status(400).json({ message: "Invalid Token or User Id" });
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User does not exist" });
    res.status(200).json({ data: user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
