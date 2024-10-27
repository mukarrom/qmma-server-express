"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const group_service_1 = require("./group.service");
// controller to get all groups
const getAllGroupsController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await group_service_1.GroupServices.getAllGroupsService();
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Groups fetched successfully!",
        data: result,
    });
});
// controller to create new group
const createNewGroupController = (0, catchAsync_1.default)(async (req, res) => {
    const groupData = req.body;
    const result = await group_service_1.GroupServices.createNewGroupService(groupData);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Group created successfully!",
        data: result,
    });
});
// controller to update group
const updateGroupController = (0, catchAsync_1.default)(async (req, res) => {
    const { groupId } = req.params;
    const groupData = req.body;
    const result = await group_service_1.GroupServices.updateGroupService(groupId, groupData);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Group updated successfully!",
        data: result,
    });
});
// controller to delete group
const deleteGroupController = (0, catchAsync_1.default)(async (req, res) => {
    const { groupId } = req.params;
    await group_service_1.GroupServices.deleteGroupService(groupId);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Group deleted successfully!",
        data: null,
    });
});
exports.GroupControllers = {
    getAllGroupsController,
    createNewGroupController,
    updateGroupController,
    deleteGroupController,
};
