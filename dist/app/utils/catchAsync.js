"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = (fn) => (req, res, next) => {
    // Resolve any promises in the controller function
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};
exports.default = catchAsync;
