"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardianControllers = void 0;
const guardian_service_1 = require("./guardian.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
// get all guardians controller
const getAllGuardiansController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await guardian_service_1.GuardianServices.getAllGuardiansService();
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Guardians fetched successfully!",
        data: result,
    });
});
// get guardian by id controller
const getGuardianByIdController = (0, catchAsync_1.default)(async (req, res) => {
    const { guardianId } = req.params;
    const result = await guardian_service_1.GuardianServices.getGuardianByIdService(guardianId);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Guardian fetched successfully!",
        data: result,
    });
});
// create new guardian controller
const createNewGuardianController = (0, catchAsync_1.default)(async (req, res) => {
    const guardianData = req.body;
    const result = await guardian_service_1.GuardianServices.createNewGuardianService(guardianData);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Guardian created successfully!",
        data: result,
    });
});
// update guardian controller
const updateGuardianController = (0, catchAsync_1.default)(async (req, res) => {
    const { guardianId } = req.params;
    const guardianData = req.body;
    const result = await guardian_service_1.GuardianServices.updateGuardianService(guardianId, guardianData);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Guardian updated successfully!",
        data: result,
    });
});
// delete guardian controller
const deleteGuardianController = (0, catchAsync_1.default)(async (req, res) => {
    const { guardianId } = req.params;
    await guardian_service_1.GuardianServices.deleteGuardianService(guardianId);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Guardian deleted successfully!",
        data: null,
    });
});
exports.GuardianControllers = {
    getAllGuardiansController,
    getGuardianByIdController,
    createNewGuardianController,
    updateGuardianController,
    deleteGuardianController,
};
