"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardianModel = void 0;
const mongoose_1 = require("mongoose");
const guardian_constant_1 = require("./guardian.constant");
// guardian model
const guardianSchema = new mongoose_1.Schema({
    guardianId: {
        type: String,
        required: true,
        unique: true,
    },
    userDetails: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    occupation: { type: String },
    relation: {
        type: String,
        enum: Object.values(guardian_constant_1.RELATIONS),
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(guardian_constant_1.GUARDIAN_STATUS),
        default: "active",
    },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.GuardianModel = (0, mongoose_1.model)("Guardian", guardianSchema);
