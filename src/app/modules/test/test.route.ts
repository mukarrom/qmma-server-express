import { Router } from "express";
import { TestControllers } from "./test.controller";
import { upload } from "../../utils/sendImageToCloudinary";

const router = Router();

router.post("/imageUpload", upload.single("file"), TestControllers.imageUploadTestToCloudinaryController);

export const TestRoutes = router;
