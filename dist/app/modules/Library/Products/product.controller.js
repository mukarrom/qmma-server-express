"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const product_service_1 = require("./product.service");
const getAllProductController = (0, catchAsync_1.default)(async (req, res) => {
    const query = req.query;
    const result = await product_service_1.ProductServices.getAllProductsService(query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Products fetched successfully!",
        meta: result.meta,
        data: result.result,
    });
});
const getProductByIdController = (0, catchAsync_1.default)(async (req, res) => {
    const { productId } = req.params;
    const result = await product_service_1.ProductServices.getProductByIdService(productId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Product fetched successfully!",
        data: result,
    });
});
const createNewProductController = (0, catchAsync_1.default)(async (req, res) => {
    const productData = req.body;
    const result = await product_service_1.ProductServices.createNewProductService(productData);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Product created successfully!",
        data: result,
    });
});
const updateProductController = (0, catchAsync_1.default)(async (req, res) => {
    const { productId } = req.params;
    const { categoryId } = req.query;
    const productData = req.body;
    const result = await product_service_1.ProductServices.updateProductService(productId, productData, categoryId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Product updated successfully!",
        data: result,
    });
});
const deleteProductController = (0, catchAsync_1.default)(async (req, res) => {
    const { productId } = req.params;
    await product_service_1.ProductServices.deleteProductService(productId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Product deleted successfully!",
        data: null,
    });
});
const getDeletedProductsController = (0, catchAsync_1.default)(async (req, res) => {
    const query = req.query;
    const result = await product_service_1.ProductServices.getDeletedProductsService(query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Deleted products fetched successfully!",
        data: result,
    });
});
const deleteForeverProductController = (0, catchAsync_1.default)(async (req, res) => {
    const { productId } = req.params;
    await product_service_1.ProductServices.deleteForeverProductService(productId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Product deleted forever!",
        data: null,
    });
});
exports.ProductControllers = {
    getAllProductController,
    getProductByIdController,
    createNewProductController,
    updateProductController,
    deleteProductController,
    getDeletedProductsController,
    deleteForeverProductController,
};
