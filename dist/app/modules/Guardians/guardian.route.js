"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardianRoutes = void 0;
const express_1 = require("express");
const guardian_controller_1 = require("./guardian.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const guardian_validation_1 = require("./guardian.validation");
const router = (0, express_1.Router)();
// get all guardians route
router.get("/", guardian_controller_1.GuardianControllers.getAllGuardiansController);
// get guardian by id route
router.get("/:guardianId", guardian_controller_1.GuardianControllers.getGuardianByIdController);
// create new guardian route
router.post("/", (0, validateRequest_1.default)(guardian_validation_1.GuardianValidations.createGuardianValidationSchema), guardian_controller_1.GuardianControllers.createNewGuardianController);
// update guardian route
router.patch("/:guardianId", (0, validateRequest_1.default)(guardian_validation_1.GuardianValidations.updateGuardianValidationSchema), guardian_controller_1.GuardianControllers.updateGuardianController);
// delete guardian route
router.delete("/:guardianId", guardian_controller_1.GuardianControllers.deleteGuardianController);
exports.GuardianRoutes = router;
