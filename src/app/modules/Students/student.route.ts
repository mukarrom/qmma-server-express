import { Router } from "express";
import { StudentControllers } from "./student.controller";
import { StudentValidations } from "./student.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/",
  validateRequest(StudentValidations.createUserGuardianStudentValidationSchema),
  StudentControllers.createNewStudentController,
);

export const StudentRoutes = router;
