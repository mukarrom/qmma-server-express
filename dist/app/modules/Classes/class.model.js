"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const status_constants_1 = require("../../constants/status.constants");
const classSchema = new mongoose_1.default.Schema({
    serial: {
        type: Number,
        required: true,
        unique: true,
    },
    nameBn: {
        type: String,
        required: true,
        unique: true,
    },
    nameAr: {
        type: String,
    },
    nameEn: {
        type: String,
    },
    status: {
        type: String,
        enum: Object.values(status_constants_1.STATUS),
        default: "active",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.ClassModel = mongoose_1.default.model("Class", classSchema);
