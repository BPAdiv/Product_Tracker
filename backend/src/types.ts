import { ObjectId } from "mongoose";

export interface IProduct {
  link: string;
  targetPrice: number;
  image?: string;
  title?: string;
  previousPrice?: number;
  salePrice?: number;
  createdAt: Date;
  saleDate?: Date;
  category?: string;
  company?: string;
  country?: string;
  followers?: import("mongoose").Types.ObjectId[];
}

export interface IUser {
  email: string;
  password: string;
  userName: string;
  telegramId?: string;
  role?: string;
  phoneNumber?: string;
  country?: string;
  products?: import("mongoose").Types.ObjectId[];
}
