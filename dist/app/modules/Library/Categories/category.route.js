"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
// Routes for Academic Year
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const category_validation_1 = require("./category.validation");
const router = (0, express_1.Router)();
// get all categories
router.get("/", category_controller_1.CategoryControllers.getAllCategoriesController);
// get all deleted categories
router.get("/deleted", category_controller_1.CategoryControllers.getDeletedCategoriesController);
// delete forever category
router.delete("/forever/:categoryId", category_controller_1.CategoryControllers.deleteForeverCategoryController);
// create new academic year
router.post("/", (0, validateRequest_1.default)(category_validation_1.CategoryValidations.updateCategoryValidationSchema), category_controller_1.CategoryControllers.createNewCategoryController);
// update academic year
router.patch("/:categoryId", (0, validateRequest_1.default)(category_validation_1.CategoryValidations.updateCategoryValidationSchema), category_controller_1.CategoryControllers.updateCategoryController);
// delete academic year
router.delete("/:categoryId", category_controller_1.CategoryControllers.deleteCategoryController);
exports.CategoryRoutes = router;
