"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudentAdmissionNo = exports.createStudentRoleNo = exports.createStudentId = void 0;
const student_model_1 = require("./student.model");
const createStudentId = async () => {
    const count = (await student_model_1.StudentModel.countDocuments()) + 1;
    const sixDigit = count.toString().padStart(6, "0");
    return "S" + sixDigit;
};
exports.createStudentId = createStudentId;
const createStudentRoleNo = async () => {
    return (await student_model_1.StudentModel.countDocuments()) + 1;
};
exports.createStudentRoleNo = createStudentRoleNo;
const createStudentAdmissionNo = async () => {
    return (await student_model_1.StudentModel.countDocuments()) + 1;
};
exports.createStudentAdmissionNo = createStudentAdmissionNo;
