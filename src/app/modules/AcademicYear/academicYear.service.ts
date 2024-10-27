import { IAcademicYear } from "./academicYear.interface";
import { AcademicYearModel } from "./academicYear.model";

// Service to get all academic year isDeleted = false
const getAllAcademicYearService = async () => {
  const result = await AcademicYearModel.find({ isDeleted: false });
  return result;
};

// Service to create new academic year
const createNewAcademicYearService = async (payload: IAcademicYear) => {
  // create serial number
  payload.serial = (await AcademicYearModel.countDocuments()) + 1;

  // create new academic year
  const result = await AcademicYearModel.create(payload);
  return result;
};

// Service to update academic year
const updateAcademicYearService = async (id: string, payload: IAcademicYear) => {
  const result = await AcademicYearModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

// Service to update academic year isDelete field to true
const deleteAcademicYearService = async (id: string) => {
  const result = await AcademicYearModel.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};

export const AcademicYearService = {
  createNewAcademicYearService,
  getAllAcademicYearService,
  updateAcademicYearService,
  deleteAcademicYearService,
};
