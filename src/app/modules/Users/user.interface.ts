import { BLOOD_GROUP, USER_ROLE, USER_STATUS } from "./user.constant";

export type TName = {
  nameBn: string;
  nameEn?: string;
  nameAr?: string;
};

export type TAddress = {
  village: string;
  postOffice: string;
  policeStation: string;
  district: string;
  postCode: string;
};

export interface IUser {
  userId: string;
  name: TName;
  photoUrl?: string;
  dateOfBirth?: Date;
  birthCertificateNo?: string;
  nidNo?: string;
  mobile?: string[];
  bloodGroup?: (typeof BLOOD_GROUP)[keyof typeof BLOOD_GROUP];
  email?: string;
  gender: "male" | "female";
  presentAddress?: TAddress;
  permanentAddress?: TAddress;
  roles: (typeof USER_ROLE)[keyof typeof USER_ROLE];
  status: (typeof USER_STATUS)[keyof typeof USER_STATUS];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
