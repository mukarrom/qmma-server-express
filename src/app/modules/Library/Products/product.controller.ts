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
  const productData = req.body;
  const result = await ProductServices.updateProductService(productId, productData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product updated successfully!",
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

export const ProductControllers = {
  getAllProductController,
  getProductByIdController,
  createNewProductController,
  updateProductController,
  deleteProductController,
};
