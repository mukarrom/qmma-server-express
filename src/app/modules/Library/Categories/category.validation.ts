import { z } from "zod";

// zod validation schema
const categoryValidationSchema = z.object({
  name: z.string({
    required_error: "name is required",
    invalid_type_error: "name must be String",
  }),
  description: z
    .string({
      invalid_type_error: "Description must be String",
    })
    .optional(),
  image: z
    .string({
      invalid_type_error: "Image must be string",
    })
    .url({
      message: "Image must be a valid URL",
    })
    .optional(),
});

const createCategoryValidationSchema = z.object({
  body: categoryValidationSchema,
});

const updateCategoryValidationSchema = z.object({
  body: categoryValidationSchema.partial(),
});

export const CategoryValidations = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
