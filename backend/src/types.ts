import { ObjectId } from "mongoose";

export interface IProduct {
  productAsin: string;
  image?: string;
  title?: string;
  previousPrice?: number;
  salePrice?: number;
  createdAt: Date;
  saleDate?: Date;
  category?: string;
  company?: string;
  country?: string;
  followers: {
    userId: import("mongoose").Types.ObjectId;
    targetPrice: number;
  }[];
}

export interface IUser {
  email: string;
  password: string;
  userName: string;
  telegramId?: string;
  role?: string;
  phoneNumber?: string;
  country?: string;
}
