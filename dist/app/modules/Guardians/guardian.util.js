"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGuardianId = void 0;
const guardian_model_1 = require("./guardian.model");
const createGuardianId = async () => {
    const getCount = ((await guardian_model_1.GuardianModel.countDocuments()) + 1).toString();
    const sixDigit = getCount.padStart(6, "0");
    return "G" + sixDigit;
};
exports.createGuardianId = createGuardianId;
