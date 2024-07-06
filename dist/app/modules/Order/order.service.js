"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = require("../Product/product.model");
const order_model_1 = require("./order.model");
// create new order service
const createOrderService = async (order) => {
    // start mongoose transaction and rollback
    const session = await order_model_1.OrderModel.startSession();
    try {
        // start mongoose transaction
        session.startTransaction();
        // update product quantity
        let updatedProduct = await product_model_1.ProductModel.findByIdAndUpdate(order.productId, { $inc: { "inventory.quantity": -order.quantity } }, { session, new: true });
        // if product quantity not updated successfully throw error
        if (!updatedProduct) {
            throw new Error("Product quantity not updated successfully");
        }
        // if product quantity is 0, set inStock to false
        if (updatedProduct?.inventory?.quantity === 0) {
            updatedProduct = await product_model_1.ProductModel.findByIdAndUpdate(updatedProduct._id, { "inventory.inStock": false }, { session, new: true });
        }
        // if product quantity is 0 and inStock is not false, throw error
        if (updatedProduct?.inventory?.quantity === 0 && updatedProduct?.inventory?.inStock === true) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "in stock not updated successfully");
        }
        // create a new order
        const newOrder = await order_model_1.OrderModel.create([order], { session });
        // commit mongoose transaction
        await session.commitTransaction();
        session.endSession();
        return newOrder;
    }
    catch (err) {
        // rollback mongoose transaction
        await session.abortTransaction();
        session.endSession();
        throw err;
    }
};
// get all orders service
const getAllOrdersService = async (query) => {
    const orders = await order_model_1.OrderModel.find(query); // api/orders?email=test@example.com
    return orders;
};
// get order by id service
const getOrderByIdService = async (id) => {
    const order = await order_model_1.OrderModel.findById(id);
    return order;
};
// update order service
const updateOrderService = async (id, order) => {
    const updatedOrder = await order_model_1.OrderModel.findByIdAndUpdate(id, order, {
        new: true,
    });
    return updatedOrder;
};
// delete order service
const deleteOrderService = async (id) => {
    const deletedOrder = await order_model_1.OrderModel.findByIdAndDelete(id);
    return deletedOrder;
};
exports.OrderServices = {
    createOrderService,
    getAllOrdersService,
    getOrderByIdService,
    updateOrderService,
    deleteOrderService,
};
