export interface IProduct {
  link: string;
  targetPrice: string;
  image?: string;
  title?: string;
  previousPrice?: number;
  salePrice?: number;
  createdAt: Date;
  saleDate?: Date;
  category?: string;
  company?: string;
  country?: string;
  followers?: IUser[];
}

export interface IUser {
  email: string;
  password: string;
  userName: string;
  telegramId?: string;
  role?: string;
  phoneNumber?: string;
  country?: string;
  products?: IProduct[];
}
