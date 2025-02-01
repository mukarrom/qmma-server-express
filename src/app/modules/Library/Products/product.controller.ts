import { RequestHandler } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { ProductServices } from "./product.service";

const getAllProductController: RequestHandler = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await ProductServices.getAllProductsService(query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products fetched successfully!",
    meta: result.meta,
    data: result.result,
  });
});

const getProductByIdController = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.getProductByIdService(productId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product fetched successfully!",
    data: result,
  });
});

const getProductsByCategoryController = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const query = req.query;
  const result = await ProductServices.getProductsByCategoryService(categoryId, query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products fetched successfully!",
    meta: result.meta,
    data: result.result,
  });
});

const createNewProductController = catchAsync(async (req, res) => {
  const productData = req.body;
  const result = await ProductServices.createNewProductService(productData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Product created successfully!",
    data: result,
  });
});

const updateProductController = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const { categoryId } = req.query;
  const productData = req.body;

  const result = await ProductServices.updateProductService(productId, productData, categoryId as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product updated successfully!",
    data: result,
  });
});

const updateProductTotalController = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const total = req.body;

  const result = await ProductServices.updateProductTotalService(productId, total?.bought, total?.sold);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product total updated successfully!",
    data: result,
  });
});

const deleteProductController = catchAsync(async (req, res) => {
  const { productId } = req.params;
  await ProductServices.deleteProductService(productId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product deleted successfully!",
    data: null,
  });
});

const getDeletedProductsController = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await ProductServices.getDeletedProductsService(query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Deleted products fetched successfully!",
    data: result,
  });
});

const deleteForeverProductController = catchAsync(async (req, res) => {
  const { productId } = req.params;
  await ProductServices.deleteForeverProductService(productId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product deleted forever!",
    data: null,
  });
});

export const ProductControllers = {
  getAllProductController,
  getProductByIdController,
  getProductsByCategoryController,
  createNewProductController,
  updateProductController,
  updateProductTotalController,
  deleteProductController,
  getDeletedProductsController,
  deleteForeverProductController,
};
