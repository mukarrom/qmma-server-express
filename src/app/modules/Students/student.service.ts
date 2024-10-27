import mongoose from "mongoose";
import { IGuardian } from "../Guardians/guardian.interface";
import { IUser } from "../Users/user.interface";
import { IStudent } from "./student.interface";
import { UserModel } from "../Users/user.model";
import { GuardianModel } from "../Guardians/guardian.model";
import { StudentModel } from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { createUserId } from "../Users/user.utils";
import { createGuardianId } from "../Guardians/guardian.util";
import { createStudentAdmissionNo, createStudentId, createStudentRoleNo } from "./student.util";

interface TPayload {
  userStudent: IUser;
  student: IStudent;
  userGuardian: IUser;
  guardian: IGuardian;
}

// create new student service
const createNewStudentService = async (payload: TPayload) => {
  const { userStudent, student, userGuardian, guardian } = payload;

  // Start transaction and rollback
  /// start session
  const session = await mongoose.startSession();
  try {
    // start transaction
    session.startTransaction();

    // create guardian and student id
    const guardianId = await createGuardianId();
    const studentId = await createStudentId();

    // set userGuardian id
    userGuardian.userId = guardianId;

    // transaction 1: create new userGuardian
    const newUserGuardian = await UserModel.create([userGuardian], { session });

    // if userGuardian not created throw error
    if (!newUserGuardian.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "userGuardian not created");
    }

    // set userGuardian id
    guardian.userDetails = newUserGuardian[0]._id;
    // create new guardian id
    guardian.guardianId = guardianId;
    // transaction 2: create new guardian
    const newGuardian = await GuardianModel.create([guardian], { session });

    // if guardian not created throw error
    if (!newGuardian.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "guardian not created");
    }

    // set new user id
    userStudent.userId = studentId;
    // transaction 3: create new student
    const newUserStudent = await UserModel.create([userStudent], { session });

    // if student not created throw error
    if (!newUserStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "userStudent not created");
    }

    // set student required fields
    student.userDetails = newUserStudent[0]._id;
    student.guardian = newGuardian[0]._id;
    student.roleNo = await createStudentRoleNo();
    student.admissionNo = await createStudentAdmissionNo();

    // set new user id
    student.studentId = studentId;
    // transaction 4: create new student
    const newStudent = await StudentModel.create([student], { session });

    // if student not created throw error
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "student not created");
    }

    // commit transaction
    await session.commitTransaction();
    session.endSession();

    // return userGuardian, guardian, userStudent, student
    return newStudent[0];
  } catch (error) {
    // rollback transaction
    await session.abortTransaction();
    session.endSession();

    // throw error
    throw error;
  }
};
export const StudentServices = {
  createNewStudentService,
};
