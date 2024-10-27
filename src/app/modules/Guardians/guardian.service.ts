import { IGuardian } from "./guardian.interface";
import { GuardianModel } from "./guardian.model";
import { createGuardianId } from "./guardian.util";

// get all guardians service
const getAllGuardiansService = async () => {
  const result = await GuardianModel.find({ isDeleted: false }).populate("userDetails");
  return result;
};

// get guardian by id service
const getGuardianByIdService = async (id: string) => {
  const result = await GuardianModel.findById(id);
  return result;
};

// create new guardian service
const createNewGuardianService = async (guardian: IGuardian) => {
  // create guardian id
  guardian.guardianId = await createGuardianId();

  // create new guardian
  const newGuardian = await GuardianModel.create(guardian);
  return newGuardian;
};

// update guardian service
const updateGuardianService = async (id: string, guardian: IGuardian) => {
  const updatedGuardian = await GuardianModel.findByIdAndUpdate(id, guardian, {
    new: true,
  });
  return updatedGuardian;
};

// delete guardian service
const deleteGuardianService = async (id: string) => {
  const deletedGuardian = await GuardianModel.findByIdAndDelete(id);
  return deletedGuardian;
};

export const GuardianServices = {
  getAllGuardiansService,
  getGuardianByIdService,
  createNewGuardianService,
  updateGuardianService,
  deleteGuardianService,
};
