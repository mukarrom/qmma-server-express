"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicYearRoutes = void 0;
// Routes for Academic Year
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicYear_controller_1 = require("./academicYear.controller");
const academicYear_validation_1 = require("./academicYear.validation");
const router = (0, express_1.Router)();
// get all academic years
router.get("/", academicYear_controller_1.AcademicYearController.getAllAcademicYearController);
// create new academic year
router.post("/", (0, validateRequest_1.default)(academicYear_validation_1.AcademicYearValidation.createAcademicYearValidationSchema), academicYear_controller_1.AcademicYearController.createNewAcademicYearController);
// update academic year
router.patch("/:academicYearId", (0, validateRequest_1.default)(academicYear_validation_1.AcademicYearValidation.updateAcademicYearValidationSchema), academicYear_controller_1.AcademicYearController.updateAcademicYearController);
// delete academic year
router.delete("/:academicYearId", academicYear_controller_1.AcademicYearController.deleteAcademicYearController);
exports.AcademicYearRoutes = router;
