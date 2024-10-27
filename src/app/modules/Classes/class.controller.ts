import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { IClass } from "./class.interface";
import { ClassServices } from "./class.service";

// controller to get all classes
const getAllClassesController = catchAsync(async (req, res) => {
  const result = await ClassServices.getAllClassesService();

  // send response
  sendResponse<IClass[]>(res, {
    statusCode: 200,
    success: true,
    message: "Classes fetched successfully!",
    data: result,
  });
});

// controller to create new class
const createNewClassController = catchAsync(async (req, res) => {
  const classData = req.body;
  const result = await ClassServices.createNewClassService(classData);

  // send response
  sendResponse<IClass>(res, {
    statusCode: 201,
    success: true,
    message: "Class created successfully!",
    data: result,
  });
});

// controller to update class
const updateClassController = catchAsync(async (req, res) => {
  const { classId } = req.params;
  const classData = req.body;
  const result = await ClassServices.updateClassService(classId, classData);

  // send response
  sendResponse<IClass | null>(res, {
    statusCode: 200,
    success: true,
    message: "Class updated successfully!",
    data: result,
  });
});

// controller to delete class
const deleteClassController = catchAsync(async (req, res) => {
  const { classId } = req.params;
  await ClassServices.deleteClassService(classId);

  // send response
  sendResponse<IClass | null>(res, {
    statusCode: 200,
    success: true,
    message: "Class deleted successfully!",
    data: null,
  });
});

export const ClassControllers = {
  getAllClassesController,
  createNewClassController,
  updateClassController,
  deleteClassController,
};
