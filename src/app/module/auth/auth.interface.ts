import { Types } from "mongoose";

export type TUserRole = "ADMIN" | "WRITTER";

export interface IRegisterUser {
  userId: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  contactNumber: string;
}
