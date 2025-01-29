import mongoose from "mongoose";
import QueryBuilder from "../../../builder/QueryBuilder";
import { IProduct } from "./product.interface";
import { ProductModel } from "./product.model";
import { CategoryModel } from "../Categories/category.model";
import AppError from "../../../errors/AppError";
import httpStatus from "http-status";

const getAllProductsService = async (query: Record<string, unknown>) => {
  const productQueryBuilder = new QueryBuilder(ProductModel.find({ isDeleted: false }).populate("category"), query)
    .search(["name", "description"])
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await productQueryBuilder.countTotal();
  const result = await productQueryBuilder.modelQuery;
  return { meta, result };
};

const getProductByIdService = async (id: string) => {
  const result = await ProductModel.findById(id).populate("category");
  return result;
};

const getDeletedProductsService = async (query: Record<string, unknown>) => {
  const productQueryBuilder = new QueryBuilder(ProductModel.find({ isDeleted: true }), query)
    .search(["name", "description"])
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await productQueryBuilder.countTotal();
  const result = await productQueryBuilder.modelQuery;
  return { meta, result };
};

const createNewProductService = async (payload: IProduct) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // create new product
    const newProduct = await ProductModel.create([payload], { session });

    // if product not created throw error
    if (!newProduct.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Product not created");
    }

    // update totalProducts in category
    const category = await CategoryModel.findByIdAndUpdate(
      payload.category,
      { $inc: { totalProducts: 1 } },
      { session, new: true },
    );

    // if category not updated throw error
    if (category === null) {
      throw new AppError(httpStatus.BAD_REQUEST, "Category not updated");
    }

    await session.commitTransaction();
    session.endSession();
    return newProduct;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const updateProductService = async (productId: string, payload: IProduct, categoryId?: string) => {
  if (payload.category) {
    const category = await CategoryModel.findById(payload.category);
    if (!category) {
      throw new AppError(httpStatus.BAD_REQUEST, "Category not found");
    }

    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      // update product
      const result = await ProductModel.findByIdAndUpdate(productId, payload, { new: true, session });

      // if product not updated throw error
      if (!result) {
        throw new AppError(httpStatus.BAD_REQUEST, "Product not updated");
      }

      // increase totalProducts in new category
      const newCategory = await CategoryModel.findByIdAndUpdate(
        result.category,
        { $inc: { totalProducts: 1 } },
        { session, new: true },
      );
      // if category not updated throw error
      if (newCategory === null) {
        throw new AppError(httpStatus.BAD_REQUEST, "Category not updated");
      }

      // decrease totalProducts in old category
      const oldCategory = await CategoryModel.findByIdAndUpdate(
        categoryId,
        { $inc: { totalProducts: -1 } },
        { session, new: true },
      );
      // if category not updated throw error
      if (oldCategory === null) {
        throw new AppError(httpStatus.BAD_REQUEST, "Category not updated");
      }

      await session.commitTransaction();
      session.endSession();
      return result;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } else {
    const result = await ProductModel.findByIdAndUpdate(productId, payload, { new: true });
    return result;
  }
};

const deleteProductService = async (id: string) => {
  const result = await ProductModel.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};

const deleteForeverProductService = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // delete product
    const result = await ProductModel.findByIdAndDelete(id, { session });

    // if product not deleted throw error
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, "Product not deleted");
    }

    console.log(result);

    // decrease totalProducts in category
    const category = await CategoryModel.findByIdAndUpdate(
      result.category,
      { $inc: { totalProducts: -1 } },
      { session, new: true },
    );
    // if category not updated throw error
    if (category === null) {
      throw new AppError(httpStatus.BAD_REQUEST, "Category not updated");
    }

    await session.commitTransaction();
    session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const ProductServices = {
  getAllProductsService,
  getProductByIdService,
  createNewProductService,
  updateProductService,
  deleteProductService,
  getDeletedProductsService,
  deleteForeverProductService,
};
