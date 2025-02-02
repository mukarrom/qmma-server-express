"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const test_service_1 = require("./test.service");
const imageUploadTestToCloudinaryController = (0, catchAsync_1.default)(async (req, res) => {
    console.log("req.file", req.file);
    const image = req.file;
    console.log(image);
    const result = await test_service_1.TestServices.uploadImageToCloudinary(image);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Image uploaded successfully",
        data: result,
    });
});
exports.TestControllers = { imageUploadTestToCloudinaryController };
