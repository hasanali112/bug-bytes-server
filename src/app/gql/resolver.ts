import config from "../config";
import { JwtHelper } from "../helper/jwtHelper";
import { IRegisterUser } from "../module/auth/auth.interface";
import { RegisterUser } from "../module/auth/auth.model";
import { authResolver } from "../module/auth/auth.resolver";
import { RegisterUserValidation } from "../module/auth/auth.validation";
import { User } from "../module/user/user.model";
import jwt from "jsonwebtoken";

export const resolvers = {
  Query: {},
  Mutation: {
    ...authResolver,
  },
};
