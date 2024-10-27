import { Router } from "express";
import { ClassControllers } from "./class.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ClassValidations } from "./class.validation";

// define router
const router = Router();

// get all classes route
router.get("/", ClassControllers.getAllClassesController);

// create new class route
router.post(
  "/",
  validateRequest(ClassValidations.createClassValidationSchema),
  ClassControllers.createNewClassController,
);

// update class route
router.patch(
  "/:classId",
  validateRequest(ClassValidations.updateClassValidationSchema),
  ClassControllers.updateClassController,
);

// delete class route
router.delete("/:classId", ClassControllers.deleteClassController);

export const ClassRoutes = router;
