import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TestServices } from "./test.service";

const imageUploadTestToCloudinaryController = catchAsync(async (req, res) => {
  console.log("req.file", req.file);

  const image = req.file;
  console.log(image);

  const result = await TestServices.uploadImageToCloudinary(image);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Image uploaded successfully",
    data: result,
  });
});

export const TestControllers = { imageUploadTestToCloudinaryController };
