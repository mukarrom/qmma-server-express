import { z } from "zod";
import { BLOOD_GROUP } from "./user.constant";

const nameValidationSchema = z.object({
  nameBn: z.string({
    required_error: "nameBn is required",
    invalid_type_error: "nameBn must be Bangla script",
  }),
  nameEn: z
    .string({
      invalid_type_error: "nameEn must be string",
    })
    .optional(),
  nameAr: z
    .string({
      invalid_type_error: "nameAr must be string",
    })
    .optional(),
});

const addressValidationSchema = z.object({
  village: z.string({
    invalid_type_error: "Village must be string",
  }),
  postOffice: z.string({
    invalid_type_error: "postOffice must be string",
  }),
  policeStation: z.string({
    invalid_type_error: "policeStation must be string",
  }),
  district: z.string({
    invalid_type_error: "district must be string",
  }),
  postCode: z.string({
    invalid_type_error: "postCode must be string",
  }),
});

// Define the user schema
const userValidationSchema = z.object(
  {
    name: nameValidationSchema,
    fatherName: z.string().optional(),
    motherName: z.string().optional(),
    photoUrl: z.string().url().optional(),
    dateOfBirth: z
      .string({
        invalid_type_error: "Date of birth must be this format (YYYY-MM-DD)",
      })
      .regex(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/) // must be in this format (YYYY-MM-DD)
      .refine((val) => new Date(val).getTime() < new Date().getTime(), "Date of birth must be in the past")
      .optional(),
    birthCertificateNo: z
      .number({
        invalid_type_error: "Invalid birth certificate number",
      })
      .refine(
        (val) => val.toString().length === 17,
        "Birth certificate number must be 17 characters long and only numbers",
      )
      .optional(),
    nidNo: z
      .number({
        invalid_type_error: "NID number must be 10 or 13 or 17 characters long and only numbers",
      })
      .refine(
        (val) => val.toString().length === 10 || val.toString().length === 13 || val.toString().length === 17,
        "Invalid NID number",
      )
      .optional(),
    mobile: z
      .array(
        z.string({
          invalid_type_error: "Mobile number must be 11 characters long and only numbers",
        }),
        // must be 11 numbers long and first two numbers must be 01
        // .regex(/^01[3-9][0-9]{8}$/),
      )
      .optional(),
    bloodGroup: z.enum(Object.values(BLOOD_GROUP) as [string, ...string[]]).optional(),
    email: z.string().email("Invalid email format").optional(),
    gender: z.enum(["male", "female"]),
    presentAddress: addressValidationSchema.optional(),
    permanentAddress: addressValidationSchema.optional(),
  },
  {
    required_error: "Required fields must be provided",
  },
);

const createUserValidationSchema = z.object({
  body: userValidationSchema,
});

const updateUserValidationSchema = z.object({
  body: userValidationSchema.partial(),
});

export const UserValidations = {
  userValidationSchema,
  createUserValidationSchema,
  updateUserValidationSchema,
};
