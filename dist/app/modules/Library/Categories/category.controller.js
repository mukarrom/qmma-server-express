"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryControllers = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const category_service_1 = require("./category.service");
const getAllCategoriesController = (0, catchAsync_1.default)(async (req, res) => {
    const query = req.query;
    const result = await category_service_1.CategoryServices.getAllCategoriesService(query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Categories fetched successfully!",
        meta: result.meta,
        data: result.result,
    });
});
const createNewCategoryController = (0, catchAsync_1.default)(async (req, res) => {
    const categoryData = req.body;
    const result = await category_service_1.CategoryServices.createNewCategoryService(categoryData);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Category created successfully!",
        data: result,
    });
});
const updateCategoryController = (0, catchAsync_1.default)(async (req, res) => {
    const { categoryId } = req.params;
    const categoryData = req.body;
    const result = await category_service_1.CategoryServices.updateCategoryService(categoryId, categoryData);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Category updated successfully!",
        data: result,
    });
});
const deleteCategoryController = (0, catchAsync_1.default)(async (req, res) => {
    const { categoryId } = req.params;
    await category_service_1.CategoryServices.deleteCategoryService(categoryId);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Category deleted successfully!",
        data: null,
    });
});
exports.CategoryControllers = {
    getAllCategoriesController,
    createNewCategoryController,
    updateCategoryController,
    deleteCategoryController,
};
