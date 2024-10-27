import { Request, Response } from "express";
import { GuardianServices } from "./guardian.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

// get all guardians controller
const getAllGuardiansController = catchAsync(async (req: Request, res: Response) => {
  const result = await GuardianServices.getAllGuardiansService();

  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Guardians fetched successfully!",
    data: result,
  });
});

// get guardian by id controller
const getGuardianByIdController = catchAsync(async (req: Request, res: Response) => {
  const { guardianId } = req.params;
  const result = await GuardianServices.getGuardianByIdService(guardianId);

  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Guardian fetched successfully!",
    data: result,
  });
});

// create new guardian controller
const createNewGuardianController = catchAsync(async (req: Request, res: Response) => {
  const guardianData = req.body;
  const result = await GuardianServices.createNewGuardianService(guardianData);

  // send response
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Guardian created successfully!",
    data: result,
  });
});

// update guardian controller
const updateGuardianController = catchAsync(async (req: Request, res: Response) => {
  const { guardianId } = req.params;
  const guardianData = req.body;
  const result = await GuardianServices.updateGuardianService(guardianId, guardianData);

  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Guardian updated successfully!",
    data: result,
  });
});

// delete guardian controller
const deleteGuardianController = catchAsync(async (req: Request, res: Response) => {
  const { guardianId } = req.params;
  await GuardianServices.deleteGuardianService(guardianId);

  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Guardian deleted successfully!",
    data: null,
  });
});

export const GuardianControllers = {
  getAllGuardiansController,
  getGuardianByIdController,
  createNewGuardianController,
  updateGuardianController,
  deleteGuardianController,
};
