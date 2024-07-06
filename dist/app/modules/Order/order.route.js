"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = require("express");
const order_validate_1 = require("./order.validate");
const order_controller_1 = require("./order.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = (0, express_1.Router)();
// create new order route
router.post("/", (0, validateRequest_1.default)(order_validate_1.OrderValidations.createOrderValidationSchema), order_controller_1.OrderControllers.createOrderController);
// get all orders route
router.get("/", order_controller_1.OrderControllers.getAllOrdersController);
// // get order by id route
// router.get("/:orderId", OrderControllers.getOrderByIdController);
// // update order route
// router.patch(
//   "/:orderId",
//   validateRequest(OrderValidations.updateOrderValidationSchema),
//   OrderControllers.updateOrderController,
// );
// // delete order route
// router.delete("/:orderId", OrderControllers.deleteOrderController);
exports.OrderRoutes = router;
