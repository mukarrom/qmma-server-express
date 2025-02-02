import { model, Schema } from "mongoose";
import { TImage } from "./test.interface";

const testSchema = new Schema<TImage>(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const TestModel = model("Test", testSchema);
