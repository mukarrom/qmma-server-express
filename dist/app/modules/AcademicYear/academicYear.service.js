"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicYearService = void 0;
const academicYear_model_1 = require("./academicYear.model");
// Service to get all academic year isDeleted = false
const getAllAcademicYearService = async () => {
    const result = await academicYear_model_1.AcademicYearModel.find({ isDeleted: false });
    return result;
};
// Service to create new academic year
const createNewAcademicYearService = async (payload) => {
    // create serial number
    payload.serial = (await academicYear_model_1.AcademicYearModel.countDocuments()) + 1;
    // create new academic year
    const result = await academicYear_model_1.AcademicYearModel.create(payload);
    return result;
};
// Service to update academic year
const updateAcademicYearService = async (id, payload) => {
    const result = await academicYear_model_1.AcademicYearModel.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};
// Service to update academic year isDelete field to true
const deleteAcademicYearService = async (id) => {
    const result = await academicYear_model_1.AcademicYearModel.findByIdAndUpdate(id, { isDeleted: true });
    return result;
};
exports.AcademicYearService = {
    createNewAcademicYearService,
    getAllAcademicYearService,
    updateAcademicYearService,
    deleteAcademicYearService,
};
