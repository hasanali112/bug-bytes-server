import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcryptjs";
import { ApiError } from "../../error/ApiError";

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "WRITER"],
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  const isFindedUser = await User.findOne({ email: user.email });
  if (isFindedUser) {
    throw new ApiError("User already exist");
  }
  user.password = await bcrypt.hash(user.password, 10);
  next();
});

export const User = model<IUser>("User", userSchema);
