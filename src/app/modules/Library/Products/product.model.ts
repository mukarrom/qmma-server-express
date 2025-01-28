import { model, Schema } from "mongoose";
import { IProduct } from "./product.interface";
import { PRODUCT_STATUS } from "../library.constant";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number, default: 0 },
    image: { type: String, default: null },
    category: { type: Schema.Types.ObjectId, ref: "category", required: true },
    tags: { type: [String], default: [] },
    totalBought: { type: Number, default: 0 },
    totalSold: { type: Number, default: 0 },
    inStock: { type: Number, default: 0 },
    status: {
      type: String,
      enum: Object.values(PRODUCT_STATUS),
      default: PRODUCT_STATUS.OUT_OF_STOCK,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const ProductModel = model<IProduct>("product", productSchema);
