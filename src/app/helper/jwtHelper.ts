import jwt, { Secret } from "jsonwebtoken";

const generateToken = (
  payload: any,
  secret: Secret,
  expiresInTime: string | number
) => {
  //@ts-ignore
  const token = jwt.sign(payload, secret, {
    expiresIn: expiresInTime,
    algorithm: "HS256",
  });

  return token;
};

export const JwtHelper = {
  generateToken,
};
