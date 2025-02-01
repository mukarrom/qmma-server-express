import mongoose from "mongoose";
import QueryBuilder from "../../../builder/QueryBuilder";
import { IProduct } from "./product.interface";
import { ProductModel } from "./product.model";
import { CategoryModel } from "../Categories/category.model";
import AppError from "../../../errors/AppError";
import httpStatus from "http-status";
import { PRODUCT_STATUS } from "../library.constant";

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

const getProductsByCategoryService = async (categoryId: string, query: Record<string, unknown>) => {
  const productQueryBuilder = new QueryBuilder(
    ProductModel.find({ isDeleted: false, category: categoryId }).populate("category"),
    query,
  )
    .search(["name", "description"])
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await productQueryBuilder.countTotal();
  const result = await productQueryBuilder.modelQuery;
  return { meta, result };
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
  const category = await CategoryModel.findById(payload.category);
  if (!category) {
    throw new AppError(httpStatus.BAD_REQUEST, "Category not found");
  }

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
  const updateData: Partial<IProduct> = {
    name: payload?.name,
    description: payload?.description,
    price: payload?.price,
  };

  if (payload.image) {
    updateData.image = payload?.image;
  }
  if (payload.tags) {
    updateData.tags = payload?.tags;
  }

  if (!payload.category) {
    const result = await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
    return result;
  }

  if (payload.category) {
    updateData.category = payload?.category;
    const category = await CategoryModel.findById(payload.category);
    if (!category) {
      throw new AppError(httpStatus.BAD_REQUEST, "Category not found");
    }

    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      // update product
      const result = await ProductModel.findByIdAndUpdate(productId, updateData, { new: true, session });

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
  }
};

const updateProductTotalService = async (productId: string, bought: number = 0, sold: number = 0) => {
  const product = await ProductModel.findById(productId);
  if (!product) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product not found");
  }
  if (product.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product is deleted");
  }
  if (bought < 0 || sold < 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid bought or sold value");
  }
  if (product.inStock + bought - sold < 0) {
    if (sold > 0) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Not enough stock to sell ${sold} ${product.name} product. In stock: ${product.inStock}`,
      );
    }
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid bought or sold value");
  }
  const status = product.inStock + bought - sold === 0 ? PRODUCT_STATUS.OUT_OF_STOCK : PRODUCT_STATUS.IN_STOCK;
  // update product
  const result = await ProductModel.findByIdAndUpdate(
    productId,
    { $inc: { totalBought: bought, totalSold: sold, inStock: bought - sold }, $set: { status: status } },
    { new: true },
  );

  return result;
};

const deleteProductService = async (id: string) => {
  const result = await ProductModel.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};

const deleteForeverProductService = async (id: string) => {
  const product = await ProductModel.findById(id);
  if (!product) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product not found");
  }

  if (product.inStock > 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product still in stock");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // delete product
    const result = await ProductModel.findByIdAndDelete(id, { session });

    // if product not deleted throw error
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, "Product not deleted");
    }

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
  getProductsByCategoryService,
  createNewProductService,
  updateProductService,
  updateProductTotalService,
  deleteProductService,
  getDeletedProductsService,
  deleteForeverProductService,
};
