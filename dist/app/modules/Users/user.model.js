"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const user_constant_1 = require("./user.constant");
const nameSchema = new mongoose_1.Schema({
    nameBn: {
        type: String,
        required: true,
    },
    nameEn: {
        type: String,
        default: "",
    },
    nameAr: {
        type: String,
        default: "",
    },
}, { _id: false });
const addressSchema = new mongoose_1.Schema({
    village: {
        type: String,
    },
    postOffice: {
        type: String,
    },
    policeStation: {
        type: String,
    },
    district: {
        type: String,
    },
    postCode: {
        type: String,
    },
}, { _id: false });
const userSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    name: nameSchema,
    photoUrl: {
        type: String,
        default: "",
    },
    dateOfBirth: {
        type: Date,
    },
    birthCertificateNo: {
        type: String,
    },
    nidNo: {
        type: String,
    },
    mobile: {
        type: [String],
    },
    bloodGroup: {
        type: String,
        enum: Object.values(user_constant_1.BLOOD_GROUP),
    },
    email: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
    },
    presentAddress: addressSchema,
    permanentAddress: addressSchema,
    roles: {
        type: String,
        enum: Object.values(user_constant_1.USER_ROLE),
    },
    status: {
        type: String,
        enum: Object.values(user_constant_1.USER_STATUS),
        default: "active",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
