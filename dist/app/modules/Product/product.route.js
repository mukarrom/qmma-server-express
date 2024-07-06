"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const product_validate_1 = require("./product.validate");
const product_controller_1 = require("./product.controller");
const router = (0, express_1.Router)();
router.post("/", (0, validateRequest_1.default)(product_validate_1.ProductsValidationSchema.createNewProductSchema), product_controller_1.ProductControllers.createProductController);
// get all products route
router.get("/", product_controller_1.ProductControllers.getAllProductsController);
// get product by id route
router.get("/:productId", product_controller_1.ProductControllers.getProductByIdController);
// update product route
router.put("/:productId", 
// validateRequest(ProductsValidationSchema.updateProductSchema),
product_controller_1.ProductControllers.updateProductController);
// delete product route
router.delete("/:productId", product_controller_1.ProductControllers.deleteProductController);
exports.ProductRoutes = router;
