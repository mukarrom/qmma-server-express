import QueryBuilder from "../../../builder/QueryBuilder";
import { IProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const getAllProductsService = async (query: Record<string, unknown>) => {
  const productQueryBuilder = new QueryBuilder(ProductModel.find({ isDeleted: false }).populate("category"), query)
    .search(["name", "description"])
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await productQueryBuilder.countTotal();
  const result = await productQueryBuilder.modelQuery;
  return { meta, result };
};

const getProductByIdService = async (id: string) => {
  const result = await ProductModel.findById(id).populate("category");
  return result;
};

const createNewProductService = async (payload: IProduct) => {
  const result = await ProductModel.create(payload);
  return result;
};

const updateProductService = async (id: string, payload: IProduct) => {
  const result = await ProductModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteProductService = async (id: string) => {
  const result = await ProductModel.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};

export const ProductServices = {
  getAllProductsService,
  getProductByIdService,
  createNewProductService,
  updateProductService,
  deleteProductService,
};
