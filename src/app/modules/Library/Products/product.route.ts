import { Router } from "express";
import { ProductControllers } from "./product.controller";
import validateRequest from "../../../middlewares/validateRequest";
import { ProductValidations } from "./product.validation";

const router = Router();

// get all products route
router.get("/", ProductControllers.getAllProductController);

// get all deleted products route
router.get("/deleted", ProductControllers.getDeletedProductsController);

// get product by id route
router.get("/:productId", ProductControllers.getProductByIdController);

// create new product route
router.post(
  "/",
  validateRequest(ProductValidations.createProductValidationSchema),
  ProductControllers.createNewProductController,
);

// update product total route
router.patch(
  "/total/:productId",
  validateRequest(ProductValidations.productTotalValidationSchema),
  ProductControllers.updateProductTotalController,
);

// update product route
router.patch(
  "/:productId",
  validateRequest(ProductValidations.updateProductValidationSchema),
  ProductControllers.updateProductController,
);

// delete forever product route
router.delete("/forever/:productId", ProductControllers.deleteForeverProductController);

// delete product route
router.delete("/:productId", ProductControllers.deleteProductController);

export const ProductRoutes = router;
