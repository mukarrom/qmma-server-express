import { z } from "zod";
import { USER_ROLE } from "../Users/user.constant";

const authValidationSchema = z.object({
  id: z.string({
    required_error: "Id is required",
    invalid_type_error: "Id must be a string",
  }),
  email: z
    .string({
      invalid_type_error: "Email must be a string",
    })
    .optional(),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),
  role: z.enum(Object.values(USER_ROLE) as [string, ...string[]], {
    required_error: "Role is required",
    invalid_type_error: "Role must be admin or student or faculty or guardian",
  }),
});

const createAuthValidationSchema = z.object({
  body: authValidationSchema,
});

const updateAuthValidationSchema = z.object({
  body: authValidationSchema.partial(),
});

export const AuthValidations = {
  createAuthValidationSchema,
  updateAuthValidationSchema,
};
