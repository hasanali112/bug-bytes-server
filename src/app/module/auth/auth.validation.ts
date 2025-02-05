import { z } from "zod";

const userSchemaValidation = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  password: z.string({
    required_error: "Password is required",
  }),
  role: z.enum(["ADMIN", "WRITER"]),
  contactNumber: z.string({
    required_error: "Contact number is required",
  }),
});

export const RegisterUserValidation = {
  userSchemaValidation,
};
