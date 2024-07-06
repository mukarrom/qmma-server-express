"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const validateRequest = (schema) => (0, catchAsync_1.default)(async (req, res, next) => {
    // parse and validate request data against the provided schema
    await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
    });
    next();
});
exports.default = validateRequest;
