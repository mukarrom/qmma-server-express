import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TestServices } from "./test.service";

const imageUploadTestToCloudinaryController = catchAsync(async (req, res) => {
  const image = req.file?.buffer;
  const imageName = `test-${Date.now()}`;

  if (!image) {
    return res.status(httpStatus.BAD_REQUEST).json({
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Image is required",
      data: null,
    });
  }
  console.log(imageName, image);

  const result = await TestServices.uploadImageToCloudinary(image);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Image uploaded successfully",
    data: result,
  });
});

export const TestControllers = { imageUploadTestToCloudinaryController };
