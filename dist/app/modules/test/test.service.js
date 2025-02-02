"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestServices = void 0;
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const uploadImageToCloudinary = async (file) => {
    const data = { name: "test", url: "" };
    // send image to cloudinary
    const imageData = (await (0, sendImageToCloudinary_1.sendImageToCloudinary)(file.path, data.name));
    data.url = imageData.secure_url;
    return data;
};
exports.TestServices = { uploadImageToCloudinary };
