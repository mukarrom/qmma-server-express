"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const student_service_1 = require("./student.service");
const createNewStudentController = (0, catchAsync_1.default)(async (req, res) => {
    const studentData = req.body;
    const result = await student_service_1.StudentServices.createNewStudentService(studentData);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Student created successfully!",
        data: result,
    });
});
exports.StudentControllers = {
    createNewStudentController,
};
