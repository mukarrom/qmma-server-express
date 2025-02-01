"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../../builder/QueryBuilder"));
const product_model_1 = require("./product.model");
const category_model_1 = require("../Categories/category.model");
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const library_constant_1 = require("../library.constant");
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
const getDeletedProductsService = async (query) => {
    const productQueryBuilder = new QueryBuilder_1.default(product_model_1.ProductModel.find({ isDeleted: true }), query)
        .search(["name", "description"])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = await productQueryBuilder.countTotal();
    const result = await productQueryBuilder.modelQuery;
    return { meta, result };
};
const createNewProductService = async (payload) => {
    const category = await category_model_1.CategoryModel.findById(payload.category);
    if (!category) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Category not found");
    }
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // create new product
        const newProduct = await product_model_1.ProductModel.create([payload], { session });
        // if product not created throw error
        if (!newProduct.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Product not created");
        }
        // update totalProducts in category
        const category = await category_model_1.CategoryModel.findByIdAndUpdate(payload.category, { $inc: { totalProducts: 1 } }, { session, new: true });
        // if category not updated throw error
        if (category === null) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Category not updated");
        }
        await session.commitTransaction();
        session.endSession();
        return newProduct;
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
const updateProductService = async (productId, payload, categoryId) => {
    const updateData = {
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
        const result = await product_model_1.ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
        return result;
    }
    if (payload.category) {
        updateData.category = payload?.category;
        const category = await category_model_1.CategoryModel.findById(payload.category);
        if (!category) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Category not found");
        }
        const session = await mongoose_1.default.startSession();
        try {
            session.startTransaction();
            // update product
            const result = await product_model_1.ProductModel.findByIdAndUpdate(productId, updateData, { new: true, session });
            // if product not updated throw error
            if (!result) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Product not updated");
            }
            // increase totalProducts in new category
            const newCategory = await category_model_1.CategoryModel.findByIdAndUpdate(result.category, { $inc: { totalProducts: 1 } }, { session, new: true });
            // if category not updated throw error
            if (newCategory === null) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Category not updated");
            }
            // decrease totalProducts in old category
            const oldCategory = await category_model_1.CategoryModel.findByIdAndUpdate(categoryId, { $inc: { totalProducts: -1 } }, { session, new: true });
            // if category not updated throw error
            if (oldCategory === null) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Category not updated");
            }
            await session.commitTransaction();
            session.endSession();
            return result;
        }
        catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    }
};
const updateProductTotalService = async (productId, bought = 0, sold = 0) => {
    const product = await product_model_1.ProductModel.findById(productId);
    if (!product) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Product not found");
    }
    if (product.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Product is deleted");
    }
    if (bought < 0 || sold < 0) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid bought or sold value");
    }
    if (product.inStock + bought - sold < 0) {
        if (sold > 0) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Not enough stock to sell ${sold} ${product.name} product. In stock: ${product.inStock}`);
        }
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid bought or sold value");
    }
    const status = product.inStock + bought - sold === 0 ? library_constant_1.PRODUCT_STATUS.OUT_OF_STOCK : library_constant_1.PRODUCT_STATUS.IN_STOCK;
    // update product
    const result = await product_model_1.ProductModel.findByIdAndUpdate(productId, { $inc: { totalBought: bought, totalSold: sold, inStock: bought - sold }, $set: { status: status } }, { new: true });
    return result;
};
const deleteProductService = async (id) => {
    const result = await product_model_1.ProductModel.findByIdAndUpdate(id, { isDeleted: true });
    return result;
};
const deleteForeverProductService = async (id) => {
    const product = await product_model_1.ProductModel.findById(id);
    if (!product) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Product not found");
    }
    if (product.inStock > 0) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Product still in stock");
    }
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // delete product
        const result = await product_model_1.ProductModel.findByIdAndDelete(id, { session });
        // if product not deleted throw error
        if (!result) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Product not deleted");
        }
        // decrease totalProducts in category
        const category = await category_model_1.CategoryModel.findByIdAndUpdate(result.category, { $inc: { totalProducts: -1 } }, { session, new: true });
        // if category not updated throw error
        if (category === null) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Category not updated");
        }
        await session.commitTransaction();
        session.endSession();
        return result;
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
exports.ProductServices = {
    getAllProductsService,
    getProductByIdService,
    createNewProductService,
    updateProductService,
    updateProductTotalService,
    deleteProductService,
    getDeletedProductsService,
    deleteForeverProductService,
};
