"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRoutes = void 0;
const express_1 = require("express");
const test_controller_1 = require("./test.controller");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const router = (0, express_1.Router)();
router.post("/imageUpload", sendImageToCloudinary_1.upload.single("file"), test_controller_1.TestControllers.imageUploadTestToCloudinaryController);
exports.TestRoutes = router;
