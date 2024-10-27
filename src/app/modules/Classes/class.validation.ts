import { z } from "zod";

// class validation schema
const ClassValidationSchema = z.object({
  nameBn: z.string({
    required_error: "Bengali name is required",
    invalid_type_error: "Bengali name must be String and Bangla script",
  }),
  nameEn: z
    .string({
      invalid_type_error: "English name must be String",
    })
    .optional(),
  nameAr: z
    .string({
      invalid_type_error: "Arabic name must be String",
    })
    .optional(),
});

const createClassValidationSchema = z.object({
  body: ClassValidationSchema,
});

const updateClassValidationSchema = z.object({
  body: ClassValidationSchema.partial(),
});

export const ClassValidations = {
  createClassValidationSchema,
  updateClassValidationSchema,
};
