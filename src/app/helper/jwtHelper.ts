import jwt, { Secret } from "jsonwebtoken";

const generateToken = (
  payload: any,
  secret: Secret,
  expiresInTime: string | number
) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: Number(expiresInTime),
    algorithm: "HS256",
  });

  console.log(secret, expiresInTime);
  return token;
};

export const JwtHelper = {
  generateToken,
};
