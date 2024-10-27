import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StudentServices } from "./student.service";

const createNewStudentController = catchAsync(async (req, res) => {
  const studentData = req.body;
  const result = await StudentServices.createNewStudentService(studentData);

  // send response
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Student created successfully!",
    data: result,
  });
});

export const StudentControllers = {
  createNewStudentController,
};
