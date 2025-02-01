"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const product_validation_1 = require("./product.validation");
const router = (0, express_1.Router)();
// get all products route
router.get("/", product_controller_1.ProductControllers.getAllProductController);
// get all deleted products route
router.get("/deleted", product_controller_1.ProductControllers.getDeletedProductsController);
// get product by id route
router.get("/:productId", product_controller_1.ProductControllers.getProductByIdController);
// create new product route
router.post("/", (0, validateRequest_1.default)(product_validation_1.ProductValidations.createProductValidationSchema), product_controller_1.ProductControllers.createNewProductController);
// update product total route
router.patch("/total/:productId", (0, validateRequest_1.default)(product_validation_1.ProductValidations.productTotalValidationSchema), product_controller_1.ProductControllers.updateProductTotalController);
// update product route
router.patch("/:productId", (0, validateRequest_1.default)(product_validation_1.ProductValidations.updateProductValidationSchema), product_controller_1.ProductControllers.updateProductController);
// delete forever product route
router.delete("/forever/:productId", product_controller_1.ProductControllers.deleteForeverProductController);
// delete product route
router.delete("/:productId", product_controller_1.ProductControllers.deleteProductController);
exports.ProductRoutes = router;
