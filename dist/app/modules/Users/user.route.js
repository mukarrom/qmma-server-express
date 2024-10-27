"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
// get all users route
router.get("/", user_controller_1.UserControllers.getAllUsersController);
// get user by id route
router.get("/:userId", user_controller_1.UserControllers.getUserByIdController);
// create new user route
router.post("/", (0, validateRequest_1.default)(user_validation_1.UserValidations.createUserValidationSchema), user_controller_1.UserControllers.createNewUserController);
// update user route
router.patch("/:userId", (0, validateRequest_1.default)(user_validation_1.UserValidations.updateUserValidationSchema), user_controller_1.UserControllers.updateUserController);
// delete user route
router.delete("/:userId", user_controller_1.UserControllers.deleteUserController);
exports.UserRoutes = router;
