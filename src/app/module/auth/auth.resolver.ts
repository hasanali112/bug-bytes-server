import mongoose from "mongoose";
import config from "../../config";
import { JwtHelper } from "../../helper/jwtHelper";
import ValidateRequest from "../../middleware/validateRequest";
import { User } from "../user/user.model";
import { IRegisterUser } from "./auth.interface";
import { RegisterUser } from "./auth.model";
import { RegisterUserValidation } from "./auth.validation";

export const authResolver = {
  registerUser: async (
    parent: any,
    { input }: { input: IRegisterUser },
    context: any
  ) => {
    const validateData = await ValidateRequest(
      RegisterUserValidation.userSchemaValidation,
      input
    );

    const seassion = await mongoose.startSession();

    try {
      seassion.startTransaction();

      //!user data
      const userData = {
        email: validateData!.email,
        password: validateData!.password,
        role: validateData!.role,
      };

      //!create user
      const [result] = await User.create([userData], { session: seassion });
      const registerUserData = {
        userId: result._id,
        ...validateData,
      };

      const [registerUser] = await RegisterUser.create([registerUserData], {
        session: seassion,
      });

      await seassion.commitTransaction();

      const jwtPayload = {
        id: registerUser.userId,
        email: registerUser.email,
        role: registerUser.role,
      };

      const accessToken = JwtHelper.generateToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string
      );

      return {
        token: accessToken,
      };
    } catch (error) {
      if (seassion.inTransaction()) {
        await seassion.abortTransaction();
        throw error;
      }
    } finally {
      seassion.endSession();
    }
  },
};
