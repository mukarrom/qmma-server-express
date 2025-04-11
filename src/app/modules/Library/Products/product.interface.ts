import { Types } from "mongoose";
import { PRODUCT_STATUS } from "../library.constant";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  image: string;
  category: Types.ObjectId; // Object Id
  tags: string[];
  totalBought: number;
  totalSold: number;
  inStock: number;
  status: (typeof PRODUCT_STATUS)[keyof typeof PRODUCT_STATUS];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TProduct = {
  title: string;
  description: string;
  price: number;
  discount: number;
  discountType: "amount" | "percentage";
  category: string;
  subCategory: string;
  brand: string;
  image: string;
  tags: string[];
  totalBought: number;
  totalSold: number;
  inStock: number;
  status: (typeof PRODUCT_STATUS)[keyof typeof PRODUCT_STATUS];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
