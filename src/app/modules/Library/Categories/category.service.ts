import QueryBuilder from "../../../builder/QueryBuilder";
import { ICategory } from "./category.interface";
import { CategoryModel } from "./category.model";

const getAllCategoriesService = async (query: Record<string, unknown>) => {
  const categoryQueryBuilder = new QueryBuilder(CategoryModel.find({ isDeleted: false }), query)
    .search(["name"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await categoryQueryBuilder.countTotal();
  const result = await categoryQueryBuilder.modelQuery;

  return { meta, result };
};

const createNewCategoryService = async (payload: ICategory) => {
  const result = await CategoryModel.create(payload);
  return result;
};

const updateCategoryService = async (id: string, payload: ICategory) => {
  const result = await CategoryModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteCategoryService = async (id: string) => {
  const result = await CategoryModel.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};

export const CategoryServices = {
  createNewCategoryService,
  getAllCategoriesService,
  updateCategoryService,
  deleteCategoryService,
};
