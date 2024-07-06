"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const product_service_1 = require("./product.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
// create new product controller
const createProductController = (0, catchAsync_1.default)(async (req, res) => {
    const productData = req.body;
    const result = await product_service_1.ProductServices.createProductService(productData);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Product created successfully!",
        data: result,
    });
});
// get all products controller
const getAllProductsController = (0, catchAsync_1.default)(async (req, res) => {
    const query = req.query;
    const result = await product_service_1.ProductServices.getAllProductsService(query);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Products fetched successfully!",
        data: result,
    });
});
// get product by id controller
const getProductByIdController = (0, catchAsync_1.default)(async (req, res) => {
    const { productId } = req.params;
    const result = await product_service_1.ProductServices.getProductByIdService(productId);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Product fetched successfully!",
        data: result,
    });
});
// update product controller
const updateProductController = (0, catchAsync_1.default)(async (req, res) => {
    const { productId } = req.params;
    const productData = req.body;
    const result = await product_service_1.ProductServices.updateProductService(productId, productData);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Product updated successfully!",
        data: result,
    });
});
// delete product controller
const deleteProductController = (0, catchAsync_1.default)(async (req, res) => {
    const { productId } = req.params;
    await product_service_1.ProductServices.deleteProductService(productId);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Product deleted successfully!",
        data: null,
    });
});
exports.ProductControllers = {
    createProductController,
    getAllProductsController,
    getProductByIdController,
    updateProductController,
    deleteProductController,
};
