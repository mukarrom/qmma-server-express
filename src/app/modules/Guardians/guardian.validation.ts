import { z } from "zod";
import { RELATIONS } from "./guardian.constant";
// guardian validation schema
const guardianValidationSchema = z.object({
  // make relation required
  relation: z.enum(Object.values(RELATIONS) as [string, ...string[]], {
    required_error: "Relation is required",
  }),
  occupation: z
    .string({
      invalid_type_error: "Occupation must be a string",
    })
    .optional(),
});

const createGuardianValidationSchema = z.object({
  body: guardianValidationSchema,
});

const updateGuardianValidationSchema = z.object({
  body: guardianValidationSchema.partial(),
});

export const GuardianValidations = {
  guardianValidationSchema,
  createGuardianValidationSchema,
  updateGuardianValidationSchema,
};
