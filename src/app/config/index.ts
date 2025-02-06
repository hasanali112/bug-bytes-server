import dotenv from "dotenv";

dotenv.config();

const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;
const jwtAccessExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
const jwtRefreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN;

if (
  !jwtAccessSecret ||
  !jwtAccessExpiresIn ||
  !jwtRefreshSecret ||
  !jwtRefreshExpiresIn
) {
  throw new Error("Missing JWT configuration in environment variables.");
}

export default {
  database_url: process.env.DATABASE_URL,
  jwt_access_secret: jwtAccessSecret,
  jwt_access_expires_in: jwtAccessExpiresIn, // Already a string
  jwt_refresh_secret: jwtRefreshSecret,
  jwt_refresh_expires_in: jwtRefreshExpiresIn, // Already a string
};
