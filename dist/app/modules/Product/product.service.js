"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
// create new product service
const createProductService = async (product) => {
    // create a new product
    const newProduct = await product_model_1.ProductModel.create(product);
    return newProduct;
};
// get all products service
const getAllProductsService = async (query) => {
    const searchableFields = ["name", "description", "category", "tags"]; // Searchable fields
    let searchQuery = {};
    if (query.searchTerm) {
        searchQuery = { $or: searchableFields.map((field) => ({ [field]: { $regex: query.searchTerm, $options: "i" } })) };
    }
    const result = await product_model_1.ProductModel.find(searchQuery);
    return result;
};
// get product by id service
const getProductByIdService = async (id) => {
    const product = await product_model_1.ProductModel.findById(id);
    return product;
};
// update product service
const updateProductService = async (id, product) => {
    const updatedProduct = await product_model_1.ProductModel.findByIdAndUpdate(id, product, {
        new: true,
    });
    return updatedProduct;
};
// delete product service
const deleteProductService = async (id) => {
    const deletedProduct = await product_model_1.ProductModel.findByIdAndDelete(id);
    return deletedProduct;
};
exports.ProductServices = {
    createProductService,
    getAllProductsService,
    getProductByIdService,
    updateProductService,
    deleteProductService,
};
