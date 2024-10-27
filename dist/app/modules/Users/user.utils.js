"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSecondUserId = exports.createUserId = void 0;
const user_model_1 = require("./user.model");
const createUserId = async () => {
    const count = (await user_model_1.UserModel.countDocuments()) + 1;
    const sixDigit = count.toString().padStart(6, "0");
    return "U" + sixDigit;
};
exports.createUserId = createUserId;
const createSecondUserId = async () => {
    const count = (await user_model_1.UserModel.countDocuments()) + 1;
    const sixDigit = count.toString().padStart(6, "0");
    return "U" + sixDigit;
};
exports.createSecondUserId = createSecondUserId;
