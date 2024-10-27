import { StudentModel } from "./student.model";

export const createStudentId: () => Promise<string> = async () => {
  const count = (await StudentModel.countDocuments()) + 1;
  const sixDigit = count.toString().padStart(6, "0");
  return "S" + sixDigit;
};

export const createStudentRoleNo: () => Promise<number> = async () => {
  return (await StudentModel.countDocuments()) + 1;
};

export const createStudentAdmissionNo: () => Promise<number> = async () => {
  return (await StudentModel.countDocuments()) + 1;
};
