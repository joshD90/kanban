import * as dotenv from "dotenv";
dotenv.config();

export default {
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  db: { password: process.env.DB_PASSWORD as string },
};
