import { UploadApiResponse } from "cloudinary";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { TImage } from "./test.interface";

const uploadImageToCloudinary = async (file: any) => {
  const data: Partial<TImage> = { name: "test", url: "" };

  // send image to cloudinary
  const imageData = (await sendImageToCloudinary(file, data.name as string)) as UploadApiResponse;
  data.url = imageData.secure_url;
  return data;
};

export const TestServices = { uploadImageToCloudinary };
