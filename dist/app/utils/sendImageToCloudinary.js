"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.sendImageToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const config_1 = __importDefault(require("../config"));
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinary_cloud_name,
    api_key: config_1.default.cloudinary_api_key,
    api_secret: config_1.default.cloudinary_api_secret,
});
const sendImageToCloudinary = (fileBuffer, imageName) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader
            .upload_stream({ public_id: imageName }, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        })
            .end(fileBuffer);
    });
};
exports.sendImageToCloudinary = sendImageToCloudinary;
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({ storage });
// export const sendImageToCloudinary = (path: string, imageName: string) => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(path, { public_id: imageName }, function (error, result) {
//       if (error) {
//         reject(error);
//       }
//       resolve(result as UploadApiResponse);
//       // delete a file asynchronously
//       fs.unlink(path, (err) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log("File is deleted.");
//         }
//       });
//     });
//   });
// };
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, process.cwd() + "/uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });
// export const upload = multer({ storage: storage });
