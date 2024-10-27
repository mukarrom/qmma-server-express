import { GuardianModel } from "./guardian.model";

export const createGuardianId: () => Promise<string> = async () => {
  const getCount = ((await GuardianModel.countDocuments()) + 1).toString();
  const sixDigit = getCount.padStart(6, "0");
  return "G" + sixDigit;
};
