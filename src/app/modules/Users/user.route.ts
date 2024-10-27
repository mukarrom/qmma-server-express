import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";
import { UserControllers } from "./user.controller";

const router = Router();

// get all users route
router.get("/", UserControllers.getAllUsersController);

// get user by id route
router.get("/:userId", UserControllers.getUserByIdController);

// create new user route
router.post("/", validateRequest(UserValidations.createUserValidationSchema), UserControllers.createNewUserController);

// update user route
router.patch(
  "/:userId",
  validateRequest(UserValidations.updateUserValidationSchema),
  UserControllers.updateUserController,
);

// delete user route
router.delete("/:userId", UserControllers.deleteUserController);

export const UserRoutes = router;
