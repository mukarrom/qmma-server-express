"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const order_service_1 = require("./order.service");
// create new order controller
const createOrderController = (0, catchAsync_1.default)(async (req, res) => {
    const orderData = req.body;
    const result = await order_service_1.OrderServices.createOrderService(orderData);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Order created successfully!",
        data: result,
    });
});
// get all orders controller
const getAllOrdersController = (0, catchAsync_1.default)(async (req, res) => {
    const query = req.query;
    const result = await order_service_1.OrderServices.getAllOrdersService(query);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Orders fetched successfully!",
        data: result,
    });
});
// get order by id controller
const getOrderByIdController = (0, catchAsync_1.default)(async (req, res) => {
    const { orderId } = req.params;
    const result = await order_service_1.OrderServices.getOrderByIdService(orderId);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Order fetched successfully!",
        data: result,
    });
});
// update order controller
const updateOrderController = (0, catchAsync_1.default)(async (req, res) => {
    const { orderId } = req.params;
    const orderData = req.body;
    const result = await order_service_1.OrderServices.updateOrderService(orderId, orderData);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Order updated successfully!",
        data: result,
    });
});
// delete order controller
const deleteOrderController = (0, catchAsync_1.default)(async (req, res) => {
    const { orderId } = req.params;
    await order_service_1.OrderServices.deleteOrderService(orderId);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Order deleted successfully!",
        data: null,
    });
});
exports.OrderControllers = {
    createOrderController,
    getAllOrdersController,
    getOrderByIdController,
    updateOrderController,
    deleteOrderController,
};
