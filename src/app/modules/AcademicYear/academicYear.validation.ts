import { z } from "zod";

// zod validation schema
const AcademicYearValidationSchema = z.object({
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
  startDate: z
    .string({
      invalid_type_error: "Start Date must be string",
    })
    .optional(),
  endDate: z
    .string({
      invalid_type_error: "End Date must be string",
    })
    .optional(),
});

const createAcademicYearValidationSchema = z.object({
  body: AcademicYearValidationSchema,
});

const updateAcademicYearValidationSchema = z.object({
  body: AcademicYearValidationSchema.partial(),
});

export const AcademicYearValidation = {
  createAcademicYearValidationSchema,
  updateAcademicYearValidationSchema,
};
