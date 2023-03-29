export interface IUser {
  _id: string;
  email: string;
  password: string;
  userName: string;
  telegramId: string;
  role?: string;
  phoneNumber?: string;
  country?: string;
}
export interface IFollowUser {
  userId: IUser | string;
  targetPrice: number;
}
export interface IProductProps {
  _id: string;
  productAsin: string;
  image?: string;
  title?: string;
  previousPrice?: string;
  currentPrice: string;
  createdAt: Date;
  lastUpdated: Date;
  category?: string;
  company?: string;
  country?: string;
  followers: IFollowUser[];
}
