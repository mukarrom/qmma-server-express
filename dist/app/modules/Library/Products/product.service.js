"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../../builder/QueryBuilder"));
const product_model_1 = require("./product.model");
const getAllProductsService = async (query) => {
    const productQueryBuilder = new QueryBuilder_1.default(product_model_1.ProductModel.find({ isDeleted: false }).populate("category"), query)
        .search(["name", "description"])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = await productQueryBuilder.countTotal();
    const result = await productQueryBuilder.modelQuery;
    return { meta, result };
};
const getProductByIdService = async (id) => {
    const result = await product_model_1.ProductModel.findById(id).populate("category");
    return result;
};
const createNewProductService = async (payload) => {
    const result = await product_model_1.ProductModel.create(payload);
    return result;
};
const updateProductService = async (id, payload) => {
    const result = await product_model_1.ProductModel.findByIdAndUpdate(id, payload, { new: true });
    return result;
};
const deleteProductService = async (id) => {
    const result = await product_model_1.ProductModel.findByIdAndUpdate(id, { isDeleted: true });
    return result;
};
exports.ProductServices = {
    getAllProductsService,
    getProductByIdService,
    createNewProductService,
    updateProductService,
    deleteProductService,
};
