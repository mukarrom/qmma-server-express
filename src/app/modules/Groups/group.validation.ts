import { z } from "zod";

// Define schema for group
const GroupValidationSchema = z.object({
  className: z.string({
    required_error: "Class name is required",
    invalid_type_error: "Class name must be a string",
  }),
  nameBn: z.string({
    required_error: "Bengali name is required",
    invalid_type_error: "Bengali name must be a string",
  }),
  nameAr: z
    .string({
      invalid_type_error: "Arabic name must be a string",
    })
    .optional(),
  nameEn: z
    .string({
      invalid_type_error: "English name must be a string",
    })
    .optional(),
});

const createGroupValidationSchema = z.object({
  body: GroupValidationSchema,
});

const updateGroupValidationSchema = z.object({
  body: GroupValidationSchema.partial(),
});

// Export the validation schema
export const GroupValidations = {
  createGroupValidationSchema,
  updateGroupValidationSchema,
};
