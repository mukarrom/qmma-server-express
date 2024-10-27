"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const student_constant_1 = require("./student.constant");
// previous education info schema
const previousEducationInfoSchema = new mongoose_1.Schema({
    previousSchoolName: {
        type: String,
        required: true,
    },
    previousClassName: {
        type: String,
        required: true,
    },
    previousGroupName: {
        type: String,
        required: true,
    },
    previousSectionName: {
        type: Number,
        required: true,
    },
    result: {
        type: String,
        required: true,
    },
}, { _id: false });
// create mongoose schema
const studentSchema = new mongoose_1.Schema({
    studentId: {
        type: String,
        required: true,
        unique: true,
    },
    userDetails: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    guardian: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Guardian",
    },
    admissionNo: {
        type: Number,
        required: true,
        unique: true,
    },
    admissionTime: {
        type: Date,
        default: Date.now,
    },
    academicYear: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Academic_year",
        required: true,
    },
    class: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Class",
        required: true,
    },
    group: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Group",
    },
    // section: {
    //   type: String,
    //   required: true,
    // },
    roleNo: {
        type: Number,
        required: true,
    },
    previousEducationInfo: previousEducationInfoSchema,
    // transaction: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Transaction",
    // },
    status: {
        type: String,
        enum: Object.values(student_constant_1.STUDENT_STATUS),
        default: "active",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// Create the model
exports.StudentModel = (0, mongoose_1.model)("Student", studentSchema);
