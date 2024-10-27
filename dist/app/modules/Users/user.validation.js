"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const nameValidationSchema = zod_1.z.object({
    nameBn: zod_1.z.string({
        required_error: "nameBn is required",
        invalid_type_error: "nameBn must be Bangla script",
    }),
    nameEn: zod_1.z
        .string({
        invalid_type_error: "nameEn must be string",
    })
        .optional(),
    nameAr: zod_1.z
        .string({
        invalid_type_error: "nameAr must be string",
    })
        .optional(),
});
const addressValidationSchema = zod_1.z.object({
    village: zod_1.z.string({
        invalid_type_error: "Village must be string",
    }),
    postOffice: zod_1.z.string({
        invalid_type_error: "postOffice must be string",
    }),
    policeStation: zod_1.z.string({
        invalid_type_error: "policeStation must be string",
    }),
    district: zod_1.z.string({
        invalid_type_error: "district must be string",
    }),
    postCode: zod_1.z.string({
        invalid_type_error: "postCode must be string",
    }),
});
// Define the user schema
const userValidationSchema = zod_1.z.object({
    name: nameValidationSchema,
    fatherName: zod_1.z.string().optional(),
    motherName: zod_1.z.string().optional(),
    photoUrl: zod_1.z.string().url().optional(),
    dateOfBirth: zod_1.z
        .string({
        invalid_type_error: "Date of birth must be this format (YYYY-MM-DD)",
    })
        .regex(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/) // must be in this format (YYYY-MM-DD)
        .refine((val) => new Date(val).getTime() < new Date().getTime(), "Date of birth must be in the past")
        .optional(),
    birthCertificateNo: zod_1.z
        .number({
        invalid_type_error: "Invalid birth certificate number",
    })
        .refine((val) => val.toString().length === 17, "Birth certificate number must be 17 characters long and only numbers")
        .optional(),
    nidNo: zod_1.z
        .number({
        invalid_type_error: "NID number must be 10 or 13 or 17 characters long and only numbers",
    })
        .refine((val) => val.toString().length === 10 || val.toString().length === 13 || val.toString().length === 17, "Invalid NID number")
        .optional(),
    mobile: zod_1.z
        .array(zod_1.z.string({
        invalid_type_error: "Mobile number must be 11 characters long and only numbers",
    }))
        .optional(),
    bloodGroup: zod_1.z.enum(Object.values(user_constant_1.BLOOD_GROUP)).optional(),
    email: zod_1.z.string().email("Invalid email format").optional(),
    gender: zod_1.z.enum(["male", "female"]),
    presentAddress: addressValidationSchema.optional(),
    permanentAddress: addressValidationSchema.optional(),
}, {
    required_error: "Required fields must be provided",
});
const createUserValidationSchema = zod_1.z.object({
    body: userValidationSchema,
});
const updateUserValidationSchema = zod_1.z.object({
    body: userValidationSchema.partial(),
});
exports.UserValidations = {
    userValidationSchema,
    createUserValidationSchema,
    updateUserValidationSchema,
};
