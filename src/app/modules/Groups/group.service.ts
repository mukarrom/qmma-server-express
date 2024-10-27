import { IGroup } from "./group.interface";
import { GroupModel } from "./group.model";

// service to get all groups with class name populated
const getAllGroupsService = async () => {
  const result = await GroupModel.find({ isDeleted: false }).populate("className");
  return result;
};

// service to create new group
const createNewGroupService = async (payload: IGroup) => {
  // create serial number
  payload.serial = (await GroupModel.countDocuments()) + 1;

  // create new group
  const result = await GroupModel.create(payload);
  return result;
};

// service to update group
const updateGroupService = async (id: string, payload: Partial<IGroup>) => {
  const result = await GroupModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

// service to delete group
const deleteGroupService = async (id: string) => {
  const result = await GroupModel.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};

export const GroupServices = {
  getAllGroupsService,
  createNewGroupService,
  updateGroupService,
  deleteGroupService,
};
