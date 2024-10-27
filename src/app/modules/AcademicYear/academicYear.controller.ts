import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { IAcademicYear } from "./academicYear.interface";
import { AcademicYearService } from "./academicYear.service";

// controller to get all academic year
const getAllAcademicYearController = catchAsync(async (req, res) => {
  const result = await AcademicYearService.getAllAcademicYearService();

  // send response
  sendResponse<IAcademicYear[]>(res, {
    statusCode: 200,
    success: true,
    message: "Academic years fetched successfully!",
    data: result,
  });
});

// controller to create new academic year
const createNewAcademicYearController = catchAsync(async (req, res) => {
  const academicYearData = req.body;
  const result = await AcademicYearService.createNewAcademicYearService(academicYearData);

  // send response
  sendResponse<IAcademicYear>(res, {
    statusCode: 201,
    success: true,
    message: "Academic year created successfully!",
    data: result,
  });
});

// controller to update academic year
const updateAcademicYearController = catchAsync(async (req, res) => {
  const { academicYearId } = req.params;
  const academicYearData = req.body;
  const result = await AcademicYearService.updateAcademicYearService(academicYearId, academicYearData);

  // send response
  sendResponse<IAcademicYear | null>(res, {
    statusCode: 200,
    success: true,
    message: "Academic year updated successfully!",
    data: result,
  });
});

// controller to delete academic year
const deleteAcademicYearController = catchAsync(async (req, res) => {
  const { academicYearId } = req.params;
  await AcademicYearService.deleteAcademicYearService(academicYearId);

  // send response
  sendResponse<IAcademicYear | null>(res, {
    statusCode: 200,
    success: true,
    message: "Academic year deleted successfully!",
    data: null,
  });
});

export const AcademicYearController = {
  createNewAcademicYearController,
  getAllAcademicYearController,
  updateAcademicYearController,
  deleteAcademicYearController,
};
