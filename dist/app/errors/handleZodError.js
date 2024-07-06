"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Define a function to handle Zod errors and convert them into a generic error response
const handleZodError = (err) => {
    // Map through the Zod issues to extract relevant information for error sources
    const errorSources = err.issues.map((issue) => {
        return {
            path: issue?.path[issue.path.length - 1], // Extract the path of the error source
            message: issue.message, // Extract the error message
        };
    });
    // Set a default HTTP status code for validation errors
    const statusCode = 400;
    // Return a generic error response with the extracted information
    return {
        statusCode,
        message: "Validation Error",
        errorSources,
    };
};
// Export the function for use in other modules
exports.default = handleZodError;
