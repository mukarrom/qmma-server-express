// Routes for Academic Year
import { Router } from "express";
import { CategoryControllers } from "./category.controller";
import validateRequest from "../../../middlewares/validateRequest";
import { CategoryValidations } from "./category.validation";

const router = Router();

// get all categories
router.get("/", CategoryControllers.getAllCategoriesController);

// create new academic year
router.post(
  "/",
  validateRequest(CategoryValidations.updateCategoryValidationSchema),
  CategoryControllers.createNewCategoryController,
);

// update academic year
router.patch(
  "/:categoryId",
  validateRequest(CategoryValidations.updateCategoryValidationSchema),
  CategoryControllers.updateCategoryController,
);

// delete academic year
router.delete("/:categoryId", CategoryControllers.deleteCategoryController);

export const CategoryRoutes = router;
