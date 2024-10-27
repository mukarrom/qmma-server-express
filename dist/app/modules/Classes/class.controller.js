"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const class_service_1 = require("./class.service");
// controller to get all classes
const getAllClassesController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await class_service_1.ClassServices.getAllClassesService();
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Classes fetched successfully!",
        data: result,
    });
});
// controller to create new class
const createNewClassController = (0, catchAsync_1.default)(async (req, res) => {
    const classData = req.body;
    const result = await class_service_1.ClassServices.createNewClassService(classData);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Class created successfully!",
        data: result,
    });
});
// controller to update class
const updateClassController = (0, catchAsync_1.default)(async (req, res) => {
    const { classId } = req.params;
    const classData = req.body;
    const result = await class_service_1.ClassServices.updateClassService(classId, classData);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Class updated successfully!",
        data: result,
    });
});
// controller to delete class
const deleteClassController = (0, catchAsync_1.default)(async (req, res) => {
    const { classId } = req.params;
    await class_service_1.ClassServices.deleteClassService(classId);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Class deleted successfully!",
        data: null,
    });
});
exports.ClassControllers = {
    getAllClassesController,
    createNewClassController,
    updateClassController,
    deleteClassController,
};
