import { config } from "dotenv";
import path from "path";

config({
  path: path.join(process.cwd(), ".env"),
});

export default {
  port: process.env.PORT,
  db: process.env.DB_URL,
  secret: process.env.SECRET_KEY,
  saltRounds: process.env.SALT_ROUNDS,
  expiresIn: process.env.EXPIRES_IN,
};
