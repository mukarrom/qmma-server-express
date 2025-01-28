"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../../builder/QueryBuilder"));
const category_model_1 = require("./category.model");
const getAllCategoriesService = async (query) => {
    const categoryQueryBuilder = new QueryBuilder_1.default(category_model_1.CategoryModel.find({ isDeleted: false }), query)
        .search(["name"])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = await categoryQueryBuilder.countTotal();
    const result = await categoryQueryBuilder.modelQuery;
    return { meta, result };
};
const createNewCategoryService = async (payload) => {
    const result = await category_model_1.CategoryModel.create(payload);
    return result;
};
const updateCategoryService = async (id, payload) => {
    const result = await category_model_1.CategoryModel.findByIdAndUpdate(id, payload, { new: true });
    return result;
};
const deleteCategoryService = async (id) => {
    const result = await category_model_1.CategoryModel.findByIdAndUpdate(id, { isDeleted: true });
    return result;
};
exports.CategoryServices = {
    createNewCategoryService,
    getAllCategoriesService,
    updateCategoryService,
    deleteCategoryService,
};
