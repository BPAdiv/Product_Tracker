import { ObjectId } from "mongoose";

export interface IUser {
  _id: import("mongoose").Types.ObjectId;
  email: string;
  password: string;
  userName: string;
  telegramId: string;
  role?: string;
  phoneNumber?: string;
  country?: string;
}
export interface IFollowUser {
  userId: IUser | import("mongoose").Types.ObjectId;
  targetPrice: number;
}
export interface IProduct {
  _id: import("mongoose").Types.ObjectId;
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
  followers: IFollowUser[];
}
