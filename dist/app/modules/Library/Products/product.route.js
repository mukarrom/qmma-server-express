"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const router = (0, express_1.Router)();
// get all products route
router.get("/", product_controller_1.ProductControllers.getAllProductController);
// get product by id route
router.get("/:productId", product_controller_1.ProductControllers.getProductByIdController);
// create new product route
router.post("/", product_controller_1.ProductControllers.createNewProductController);
// update product route
router.patch("/:productId", product_controller_1.ProductControllers.updateProductController);
// delete product route
router.delete("/:productId", product_controller_1.ProductControllers.deleteProductController);
exports.ProductRoutes = router;
