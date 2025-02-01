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
      required_error: "Price is required",
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
    required_error: "Category is required",
    invalid_type_error: "Category must be Object Id",
  }),
  tags: z
    .array(
      z.string({
        invalid_type_error: "Tags must be an array of strings",
      }),
    )
    .optional(),
});

const createProductValidationSchema = z.object({
  body: ProductValidationSchema,
});

const updateProductValidationSchema = z.object({
  body: ProductValidationSchema.partial(),
});

const productTotalValidationSchema = z.object({
  body: z.object({
    bought: z
      .number({
        invalid_type_error: "bought must be Number",
      })
      .default(0)
      .optional(),
    sold: z
      .number({
        invalid_type_error: "sold must be Number",
      })
      .default(0)
      .optional(),
  }),
});

export const ProductValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
  productTotalValidationSchema,
};
