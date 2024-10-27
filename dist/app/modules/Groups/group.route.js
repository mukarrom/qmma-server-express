"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const group_validation_1 = require("./group.validation");
const group_controller_1 = require("./group.controller");
const router = (0, express_1.Router)();
// get all groups route
router.get("/", group_controller_1.GroupControllers.getAllGroupsController);
// create new group route
router.post("/", (0, validateRequest_1.default)(group_validation_1.GroupValidations.createGroupValidationSchema), group_controller_1.GroupControllers.createNewGroupController);
// update group route
router.patch("/:groupId", (0, validateRequest_1.default)(group_validation_1.GroupValidations.updateGroupValidationSchema), group_controller_1.GroupControllers.updateGroupController);
// delete group route
router.delete("/:groupId", group_controller_1.GroupControllers.deleteGroupController);
exports.GroupRoutes = router;
