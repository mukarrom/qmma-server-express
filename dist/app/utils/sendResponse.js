"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// define a utility function to send responses
const sendResponse = (res, data) => {
    res.status(data?.statusCode).json({
        success: data?.success,
        message: data?.message,
        data: data?.data,
    });
};
exports.default = sendResponse;
