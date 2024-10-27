import { IClass } from "./class.interface";
import { ClassModel } from "./class.model";

// service to get all classes
const getAllClassesService = async () => {
  const result = await ClassModel.find({ isDeleted: false });
  return result;
};

// service to create new class
const createNewClassService = async (payload: IClass) => {
  // create serial number
  payload.serial = (await ClassModel.countDocuments()) + 1;

  // create new class
  const result = await ClassModel.create(payload);
  return result;
};

// service to update class
const updateClassService = async (id: string, payload: IClass) => {
  const result = await ClassModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

// service to delete class
const deleteClassService = async (id: string) => {
  const result = await ClassModel.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};

export const ClassServices = {
  getAllClassesService,
  createNewClassService,
  updateClassService,
  deleteClassService,
};
