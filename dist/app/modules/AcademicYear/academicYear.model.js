"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicYearModel = void 0;
const mongoose_1 = require("mongoose");
const academicYear_constant_1 = require("./academicYear.constant");
const academicYearSchema = new mongoose_1.Schema({
    serial: { type: Number, required: true, unique: true }, // auto increment by 1
    nameBn: { type: String, required: true, unique: true },
    nameAr: { type: String, unique: true },
    nameEn: { type: String, unique: true },
    startDate: { type: Date, required: true, unique: true },
    endDate: { type: Date, required: true, unique: true },
    status: {
        type: String,
        enum: Object.values(academicYear_constant_1.ACADEMIC_YEAR_STATUS),
        default: academicYear_constant_1.ACADEMIC_YEAR_STATUS.UPCOMING,
    },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.AcademicYearModel = (0, mongoose_1.model)("Academic_year", academicYearSchema);
