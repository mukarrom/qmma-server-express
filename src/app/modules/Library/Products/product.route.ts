import { Router } from "express";
import { ProductControllers } from "./product.controller";

const router = Router();

// get all products route
router.get("/", ProductControllers.getAllProductController);

// get all deleted products route
router.get("/deleted", ProductControllers.getDeletedProductsController);

// get product by id route
router.get("/:productId", ProductControllers.getProductByIdController);

// create new product route
router.post("/", ProductControllers.createNewProductController);

// update product route
router.patch("/:productId", ProductControllers.updateProductController);

// delete forever product route
router.delete("/forever/:productId", ProductControllers.deleteForeverProductController);

// delete product route
router.delete("/:productId", ProductControllers.deleteProductController);

export const ProductRoutes = router;
