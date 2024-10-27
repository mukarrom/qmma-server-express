"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupServices = void 0;
const group_model_1 = require("./group.model");
// service to get all groups with class name populated
const getAllGroupsService = async () => {
    const result = await group_model_1.GroupModel.find({ isDeleted: false }).populate("className");
    return result;
};
// service to create new group
const createNewGroupService = async (payload) => {
    // create serial number
    payload.serial = (await group_model_1.GroupModel.countDocuments()) + 1;
    // create new group
    const result = await group_model_1.GroupModel.create(payload);
    return result;
};
// service to update group
const updateGroupService = async (id, payload) => {
    const result = await group_model_1.GroupModel.findByIdAndUpdate(id, payload, { new: true });
    return result;
};
// service to delete group
const deleteGroupService = async (id) => {
    const result = await group_model_1.GroupModel.findByIdAndUpdate(id, { isDeleted: true });
    return result;
};
exports.GroupServices = {
    getAllGroupsService,
    createNewGroupService,
    updateGroupService,
    deleteGroupService,
};
