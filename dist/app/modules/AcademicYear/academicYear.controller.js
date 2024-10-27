"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicYearController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const academicYear_service_1 = require("./academicYear.service");
// controller to get all academic year
const getAllAcademicYearController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await academicYear_service_1.AcademicYearService.getAllAcademicYearService();
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Academic years fetched successfully!",
        data: result,
    });
});
// controller to create new academic year
const createNewAcademicYearController = (0, catchAsync_1.default)(async (req, res) => {
    const academicYearData = req.body;
    const result = await academicYear_service_1.AcademicYearService.createNewAcademicYearService(academicYearData);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Academic year created successfully!",
        data: result,
    });
});
// controller to update academic year
const updateAcademicYearController = (0, catchAsync_1.default)(async (req, res) => {
    const { academicYearId } = req.params;
    const academicYearData = req.body;
    const result = await academicYear_service_1.AcademicYearService.updateAcademicYearService(academicYearId, academicYearData);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Academic year updated successfully!",
        data: result,
    });
});
// controller to delete academic year
const deleteAcademicYearController = (0, catchAsync_1.default)(async (req, res) => {
    const { academicYearId } = req.params;
    await academicYear_service_1.AcademicYearService.deleteAcademicYearService(academicYearId);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Academic year deleted successfully!",
        data: null,
    });
});
exports.AcademicYearController = {
    createNewAcademicYearController,
    getAllAcademicYearController,
    updateAcademicYearController,
    deleteAcademicYearController,
};
