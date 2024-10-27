"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardianValidations = void 0;
const zod_1 = require("zod");
const guardian_constant_1 = require("./guardian.constant");
// guardian validation schema
const guardianValidationSchema = zod_1.z.object({
    // make relation required
    relation: zod_1.z.enum(Object.values(guardian_constant_1.RELATIONS), {
        required_error: "Relation is required",
    }),
    occupation: zod_1.z
        .string({
        invalid_type_error: "Occupation must be a string",
    })
        .optional(),
});
const createGuardianValidationSchema = zod_1.z.object({
    body: guardianValidationSchema,
});
const updateGuardianValidationSchema = zod_1.z.object({
    body: guardianValidationSchema.partial(),
});
exports.GuardianValidations = {
    guardianValidationSchema,
    createGuardianValidationSchema,
    updateGuardianValidationSchema,
};
