import { Router } from "express";
import { GuardianControllers } from "./guardian.controller";
import validateRequest from "../../middlewares/validateRequest";
import { GuardianValidations } from "./guardian.validation";

const router = Router();

// get all guardians route
router.get("/", GuardianControllers.getAllGuardiansController);

// get guardian by id route
router.get("/:guardianId", GuardianControllers.getGuardianByIdController);

// create new guardian route
// router.post(
//   "/",
//   validateRequest(GuardianValidations.createGuardianValidationSchema),
//   GuardianControllers.createNewGuardianController,
// );

// update guardian route
router.patch(
  "/:guardianId",
  validateRequest(GuardianValidations.updateGuardianValidationSchema),
  GuardianControllers.updateGuardianController,
);

// delete guardian route
router.delete("/:guardianId", GuardianControllers.deleteGuardianController);

export const GuardianRoutes = router;
