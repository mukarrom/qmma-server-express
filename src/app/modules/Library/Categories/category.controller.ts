import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { ICategory } from "./category.interface";
import { CategoryServices } from "./category.service";

const getAllCategoriesController = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await CategoryServices.getAllCategoriesService(query);

  sendResponse<ICategory[]>(res, {
    statusCode: 200,
    success: true,
    message: "Categories fetched successfully!",
    meta: result.meta,
    data: result.result,
  });
});

const createNewCategoryController = catchAsync(async (req, res) => {
  const categoryData = req.body;
  const result = await CategoryServices.createNewCategoryService(categoryData);
  // send response
  sendResponse<ICategory>(res, {
    statusCode: 201,
    success: true,
    message: "Category created successfully!",
    data: result,
  });
});

const updateCategoryController = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const categoryData = req.body;
  const result = await CategoryServices.updateCategoryService(categoryId, categoryData);

  // send response
  sendResponse<ICategory | null>(res, {
    statusCode: 200,
    success: true,
    message: "Category updated successfully!",
    data: result,
  });
});

const deleteCategoryController = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  await CategoryServices.deleteCategoryService(categoryId);

  // send response
  sendResponse<ICategory | null>(res, {
    statusCode: 200,
    success: true,
    message: "Category deleted successfully!",
    data: null,
  });
});

const getDeletedCategoriesController = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await CategoryServices.getDeletedCategoriesService(query);

  sendResponse<ICategory[]>(res, {
    statusCode: 200,
    success: true,
    message: "Deleted categories fetched successfully!",
    meta: result.meta,
    data: result.result,
  });
});

const deleteForeverCategoryController = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  await CategoryServices.deleteForeverCategoryService(categoryId);

  // send response
  sendResponse<ICategory | null>(res, {
    statusCode: 200,
    success: true,
    message: "Category deleted forever successfully!",
    data: null,
  });
});

export const CategoryControllers = {
  getAllCategoriesController,
  createNewCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getDeletedCategoriesController,
  deleteForeverCategoryController,
};
