"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassServices = void 0;
const class_model_1 = require("./class.model");
// service to get all classes
const getAllClassesService = async () => {
    const result = await class_model_1.ClassModel.find({ isDeleted: false });
    return result;
};
// service to create new class
const createNewClassService = async (payload) => {
    // create serial number
    payload.serial = (await class_model_1.ClassModel.countDocuments()) + 1;
    // create new class
    const result = await class_model_1.ClassModel.create(payload);
    return result;
};
// service to update class
const updateClassService = async (id, payload) => {
    const result = await class_model_1.ClassModel.findByIdAndUpdate(id, payload, { new: true });
    return result;
};
// service to delete class
const deleteClassService = async (id) => {
    const result = await class_model_1.ClassModel.findByIdAndUpdate(id, { isDeleted: true });
    return result;
};
exports.ClassServices = {
    getAllClassesService,
    createNewClassService,
    updateClassService,
    deleteClassService,
};
