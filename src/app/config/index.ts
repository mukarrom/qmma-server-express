import { config } from "dotenv";
import path from "path";

config({ path: path.join(process.cwd(), ".env") });

export default {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 8080,
  atlas_url: process.env.MONGO_URI,
  local_url: process.env.MONGO_LOCAL_URL,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || "76067b6d3869fe34102ca24cf7ccb97c5483e30aa0e4555e2abca6c6e95a9131",
  jwtRefreshSecret:
    process.env.JWT_REFRESH_SECRET ||
    "ae9be8e8e0b351d828a6efd5c73eafbf7d9a1545e04b33e2e2cce4ca6a07f7516381b51325d3c8a37a046dc930bbabc86cb0a777ff77d6f70142dfafd40f1d7e",
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "1d",
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
};
