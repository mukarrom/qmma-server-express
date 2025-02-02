"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestModel = void 0;
const mongoose_1 = require("mongoose");
const testSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
}, {
    timestamps: true,
});
exports.TestModel = (0, mongoose_1.model)("Test", testSchema);
