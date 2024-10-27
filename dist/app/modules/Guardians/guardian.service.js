"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardianServices = void 0;
const guardian_model_1 = require("./guardian.model");
const guardian_util_1 = require("./guardian.util");
// get all guardians service
const getAllGuardiansService = async () => {
    const result = await guardian_model_1.GuardianModel.find({ isDeleted: false }).populate("userDetails");
    return result;
};
// get guardian by id service
const getGuardianByIdService = async (id) => {
    const result = await guardian_model_1.GuardianModel.findById(id);
    return result;
};
// create new guardian service
const createNewGuardianService = async (guardian) => {
    // create guardian id
    guardian.guardianId = await (0, guardian_util_1.createGuardianId)();
    // create new guardian
    const newGuardian = await guardian_model_1.GuardianModel.create(guardian);
    return newGuardian;
};
// update guardian service
const updateGuardianService = async (id, guardian) => {
    const updatedGuardian = await guardian_model_1.GuardianModel.findByIdAndUpdate(id, guardian, {
        new: true,
    });
    return updatedGuardian;
};
// delete guardian service
const deleteGuardianService = async (id) => {
    const deletedGuardian = await guardian_model_1.GuardianModel.findByIdAndDelete(id);
    return deletedGuardian;
};
exports.GuardianServices = {
    getAllGuardiansService,
    getGuardianByIdService,
    createNewGuardianService,
    updateGuardianService,
    deleteGuardianService,
};
