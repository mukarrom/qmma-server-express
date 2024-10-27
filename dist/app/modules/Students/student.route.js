"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = require("express");
const student_controller_1 = require("./student.controller");
const student_validation_1 = require("./student.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = (0, express_1.Router)();
router.post("/", (0, validateRequest_1.default)(student_validation_1.StudentValidations.createUserGuardianStudentValidationSchema), student_controller_1.StudentControllers.createNewStudentController);
exports.StudentRoutes = router;
