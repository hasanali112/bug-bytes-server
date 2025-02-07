import mongoose from "mongoose";
import config from "../../config";
import { JwtHelper } from "../../helper/jwtHelper";
import ValidateRequest from "../../middleware/validateRequest";
import { User } from "../user/user.model";
import { IRegisterUser } from "./auth.interface";
import { RegisterUser } from "./auth.model";
import { RegisterUserValidation } from "./auth.validation";
import { ApiError } from "../../error/ApiError";
import bcrypt from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";

//register user
export const registerResolver = {
  registerUser: async (
    _parent: any,
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

      const refreshToken = JwtHelper.generateToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as string
      );

      //!set cookie
      context.res.setHeader(
        "set-cookie",
        `refreshToken=${refreshToken}; HttpOnly; secure; path=/; max-age=${config.jwt_refresh_expires_in}`
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

//login user
export const loginResolver = {
  login: async (_parent: any, { input }: { input: any }, context: any) => {
    const { email, password } = input;
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError("User not found");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Invalid password");
    }
    const jwtPayload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const accessToken = JwtHelper.generateToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string
    );

    const refreshToken = JwtHelper.generateToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string
    );

    //!set cookie
    context.res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return {
      token: accessToken,
    };
  },
};

//refresh token
export const refreshResolver = {
  refresh: async (_parent: any, _args: any, context: any) => {
    try {
      const refreshToken = context.req.cookies.refreshToken;
      if (!refreshToken) {
        throw new ApiError("Refresh token not found in cookies");
      }

      const jwtPayload = JwtHelper.verifyToken(
        refreshToken,
        config.jwt_refresh_secret as string
      ) as JwtPayload;

      const userData = await User.findOne({ email: jwtPayload.email });

      const accessToken = JwtHelper.generateToken(
        { id: userData?._id, email: userData?.email, role: userData?.role },
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string
      );

      return {
        token: accessToken,
      };
    } catch (error) {
      console.error("Error in refresh resolver:", error);
      throw new ApiError("Invalid refresh token");
    }
  },
};
