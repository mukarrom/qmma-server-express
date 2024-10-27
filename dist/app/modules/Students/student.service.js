"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../Users/user.model");
const guardian_model_1 = require("../Guardians/guardian.model");
const student_model_1 = require("./student.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const guardian_util_1 = require("../Guardians/guardian.util");
const student_util_1 = require("./student.util");
// create new student service
const createNewStudentService = async (payload) => {
    const { userStudent, student, userGuardian, guardian } = payload;
    // Start transaction and rollback
    /// start session
    const session = await mongoose_1.default.startSession();
    try {
        // start transaction
        session.startTransaction();
        // create guardian and student id
        const guardianId = await (0, guardian_util_1.createGuardianId)();
        const studentId = await (0, student_util_1.createStudentId)();
        // set userGuardian id
        userGuardian.userId = guardianId;
        // transaction 1: create new userGuardian
        const newUserGuardian = await user_model_1.UserModel.create([userGuardian], { session });
        // if userGuardian not created throw error
        if (!newUserGuardian.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "userGuardian not created");
        }
        // set userGuardian id
        guardian.userDetails = newUserGuardian[0]._id;
        // create new guardian id
        guardian.guardianId = guardianId;
        // transaction 2: create new guardian
        const newGuardian = await guardian_model_1.GuardianModel.create([guardian], { session });
        // if guardian not created throw error
        if (!newGuardian.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "guardian not created");
        }
        // set new user id
        userStudent.userId = studentId;
        // transaction 3: create new student
        const newUserStudent = await user_model_1.UserModel.create([userStudent], { session });
        // if student not created throw error
        if (!newUserStudent.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "userStudent not created");
        }
        // set student required fields
        student.userDetails = newUserStudent[0]._id;
        student.guardian = newGuardian[0]._id;
        student.roleNo = await (0, student_util_1.createStudentRoleNo)();
        student.admissionNo = await (0, student_util_1.createStudentAdmissionNo)();
        // set new user id
        student.studentId = studentId;
        // transaction 4: create new student
        const newStudent = await student_model_1.StudentModel.create([student], { session });
        // if student not created throw error
        if (!newStudent.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "student not created");
        }
        // commit transaction
        await session.commitTransaction();
        session.endSession();
        // return userGuardian, guardian, userStudent, student
        return newStudent[0];
    }
    catch (error) {
        // rollback transaction
        await session.abortTransaction();
        session.endSession();
        // throw error
        throw error;
    }
};
exports.StudentServices = {
    createNewStudentService,
};
