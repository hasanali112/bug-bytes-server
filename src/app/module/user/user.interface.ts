import { TUserRole } from "../auth/auth.interface";

export interface IUser {
  email: string;
  password: string;
  role: TUserRole;
  isDeleted: boolean;
  status: "ACTIVE" | "INACTIVE";
}
