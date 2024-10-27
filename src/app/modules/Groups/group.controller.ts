import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { IGroup } from "./group.interface";
import { GroupServices } from "./group.service";

// controller to get all groups
const getAllGroupsController = catchAsync(async (req, res) => {
  const result = await GroupServices.getAllGroupsService();

  // send response
  sendResponse<IGroup[]>(res, {
    statusCode: 200,
    success: true,
    message: "Groups fetched successfully!",
    data: result,
  });
});

// controller to create new group
const createNewGroupController = catchAsync(async (req, res) => {
  const groupData = req.body;
  const result = await GroupServices.createNewGroupService(groupData);

  // send response
  sendResponse<IGroup>(res, {
    statusCode: 201,
    success: true,
    message: "Group created successfully!",
    data: result,
  });
});

// controller to update group
const updateGroupController = catchAsync(async (req, res) => {
  const { groupId } = req.params;
  const groupData = req.body;
  const result = await GroupServices.updateGroupService(groupId, groupData);

  // send response
  sendResponse<IGroup | null>(res, {
    statusCode: 200,
    success: true,
    message: "Group updated successfully!",
    data: result,
  });
});

// controller to delete group
const deleteGroupController = catchAsync(async (req, res) => {
  const { groupId } = req.params;
  await GroupServices.deleteGroupService(groupId);

  // send response
  sendResponse<IGroup | null>(res, {
    statusCode: 200,
    success: true,
    message: "Group deleted successfully!",
    data: null,
  });
});

export const GroupControllers = {
  getAllGroupsController,
  createNewGroupController,
  updateGroupController,
  deleteGroupController,
};
