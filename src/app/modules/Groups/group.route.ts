import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { GroupValidations } from "./group.validation";
import { GroupControllers } from "./group.controller";

const router = Router();

// get all groups route
router.get("/", GroupControllers.getAllGroupsController);

// create new group route
router.post(
  "/",
  validateRequest(GroupValidations.createGroupValidationSchema),
  GroupControllers.createNewGroupController,
);

// update group route
router.patch(
  "/:groupId",
  validateRequest(GroupValidations.updateGroupValidationSchema),
  GroupControllers.updateGroupController,
);

// delete group route
router.delete("/:groupId", GroupControllers.deleteGroupController);

export const GroupRoutes = router;
