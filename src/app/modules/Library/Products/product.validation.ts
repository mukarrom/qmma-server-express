import { z } from "zod";

// zod validation schema
const ProductValidationSchema = z.object({
  name: z.string({
    required_error: "name is required",
    invalid_type_error: "name must be String",
  }),
  description: z
    .string({
      invalid_type_error: "Description must be String",
    })
    .optional(),
  price: z
    .number({
      invalid_type_error: "Price must be Number",
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
  category: z.string({
    invalid_type_error: "Category must be Object Id",
  }),
  tags: z.array(
    z.string({
      invalid_type_error: "Tags must be an array of strings",
    }),
  ),
  totalBought: z
    .number({
      invalid_type_error: "Total Bought must be a number",
    })
    .optional(),
  totalSold: z
    .number({
      invalid_type_error: "Total Sold must be a number",
    })
    .optional(),
  inStock: z
    .number({
      invalid_type_error: "In Stock must be a number",
    })
    .optional(),
});

const createProductValidationSchema = z.object({
  body: ProductValidationSchema,
});

const updateProductValidationSchema = z.object({
  body: ProductValidationSchema.partial(),
});

export const AcademicYearValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
