import { STATUS } from "../../constants/status.constants";

export interface IClass {
  serial: number;
  nameBn: string;
  nameAr: string;
  nameEn: string;
  status: (typeof STATUS)[keyof typeof STATUS];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
