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
const config_1 = __importDefault(require("../../config"));
const imageUploadTestToCloudinaryController = (0, catchAsync_1.default)(async (req, res) => {
    const image = req.file?.buffer;
    // const imageName = `test-${Date.now()}`;
    if (!image) {
        return res.status(http_status_1.default.BAD_REQUEST).json({
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: "Image is required",
            data: null,
        });
    }
    console.log(`cloud_name: ${config_1.default.cloudinary_cloud_name}`);
    console.log(`api_key: ${config_1.default.cloudinary_api_key}`);
    console.log(`api_secret: ${config_1.default.cloudinary_api_secret}`);
    const result = await test_service_1.TestServices.uploadImageToCloudinary(image);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Image uploaded successfully",
        data: result,
    });
});
exports.TestControllers = { imageUploadTestToCloudinaryController };
