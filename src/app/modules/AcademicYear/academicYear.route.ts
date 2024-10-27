// Routes for Academic Year
import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicYearController } from "./academicYear.controller";
import { AcademicYearValidation } from "./academicYear.validation";

const router = Router();

// get all academic years
router.get("/", AcademicYearController.getAllAcademicYearController);

// create new academic year
router.post(
  "/",
  validateRequest(AcademicYearValidation.createAcademicYearValidationSchema),
  AcademicYearController.createNewAcademicYearController,
);

// update academic year
router.patch(
  "/:academicYearId",
  validateRequest(AcademicYearValidation.updateAcademicYearValidationSchema),
  AcademicYearController.updateAcademicYearController,
);

// delete academic year
router.delete("/:academicYearId", AcademicYearController.deleteAcademicYearController);

export const AcademicYearRoutes = router;
