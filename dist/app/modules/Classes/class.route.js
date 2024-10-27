"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassRoutes = void 0;
const express_1 = require("express");
const class_controller_1 = require("./class.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const class_validation_1 = require("./class.validation");
// define router
const router = (0, express_1.Router)();
// get all classes route
router.get("/", class_controller_1.ClassControllers.getAllClassesController);
// create new class route
router.post("/", (0, validateRequest_1.default)(class_validation_1.ClassValidations.createClassValidationSchema), class_controller_1.ClassControllers.createNewClassController);
// update class route
router.patch("/:classId", (0, validateRequest_1.default)(class_validation_1.ClassValidations.updateClassValidationSchema), class_controller_1.ClassControllers.updateClassController);
// delete class route
router.delete("/:classId", class_controller_1.ClassControllers.deleteClassController);
exports.ClassRoutes = router;
