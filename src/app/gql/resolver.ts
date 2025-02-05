import config from "../config";
import { IRegisterUser } from "../module/auth/auth.interface";
import { RegisterUser } from "../module/auth/auth.model";
import { RegisterUserValidation } from "../module/auth/auth.validation";
import { User } from "../module/user/user.model";
import jwt from "jsonwebtoken";

export const resolvers = {
  Query: {},
  Mutation: {
    registerUser: async (
      parent: any,
      { input }: { input: IRegisterUser },
      context: any
    ) => {
      const validateData =
        RegisterUserValidation.userSchemaValidation.parse(input);
      try {
        const userData = {
          email: validateData.email,
          password: validateData.password,
          role: validateData.role,
        };
        const result = await User.create(userData);
        const registerUserData = {
          userId: result._id,
          ...validateData,
        };

        const registerUser = await RegisterUser.create(registerUserData);

        const jwtPayload = {
          id: registerUser.userId,
          email: registerUser.email,
          role: registerUser.role,
        };

        const accessToken = jwt.sign(
          jwtPayload,
          config.jwt_access_secret as string,
          {
            algorithm: "HS256",
            expiresIn: "1d",
          }
        );

        return {
          token: accessToken,
        };
      } catch (error) {
        console.log(error);
      }
    },
  },
};
