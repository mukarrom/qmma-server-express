import { config } from "dotenv";
import path from "path";

config({ path: path.join(process.cwd(), ".env") });

export default {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 8080,
  atlas_url: process.env.MONGO_URI,
  local_url: process.env.MONGO_LOCAL_URL,
  JWT_SECRET: process.env.JWT_SECRET || "secret",
};
