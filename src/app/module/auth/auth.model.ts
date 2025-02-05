import { model, Schema } from "mongoose";
import { IRegisterUser } from "./auth.interface";

const registerUserSchema = new Schema<IRegisterUser>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "WRITER"],
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const RegisterUser = model<IRegisterUser>(
  "RegisterUser",
  registerUserSchema
);
