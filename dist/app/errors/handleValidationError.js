"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Define a function to handle Mongoose CastErrors and convert them into a generic error response
const handleCastError = (err) => {
    // Create an error source with the path and message from the CastError
    const errorSources = [
        {
            path: err.path, // Extract the path of the error source
            message: err.message, // Extract the error message
        },
    ];
    // Set a default HTTP status code for invalid ID errors
    const statusCode = 400;
    // Return a generic error response with the extracted information
    return {
        statusCode,
        message: "Invalid ID",
        errorSources,
    };
};
// Export the function for use in other modules
exports.default = handleCastError;
