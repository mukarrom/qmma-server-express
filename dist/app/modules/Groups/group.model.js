"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModel = void 0;
const mongoose_1 = require("mongoose");
const status_constants_1 = require("../../constants/status.constants");
// Create the schema
const groupSchema = new mongoose_1.Schema({
    className: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Class",
        required: true,
    },
    serial: { type: Number, required: true, unique: true }, // auto increment by 1
    nameBn: { type: String, required: true },
    nameAr: { type: String },
    nameEn: { type: String },
    status: { type: String, enum: Object.values(status_constants_1.STATUS), default: "active" },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
// Create the model
exports.GroupModel = (0, mongoose_1.model)("Group", groupSchema);
