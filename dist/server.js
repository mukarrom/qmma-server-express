"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
const port = process.env.PORT || 8050;
let server;
console.log(port);
async function main() {
    try {
        // connect to db
        await mongoose_1.default.connect(config_1.default.db_url);
        // start server
        server = app_1.default.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
    catch (error) {
        // log any errors that occur during server startup
        console.log(error);
    }
}
// call the main function
main();
// handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.log("😡unhandledRejection: Error name: ", err.name, " Message: ", err.message);
    console.log("Server shutting down...");
    // close server
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
// handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log("😡uncaughtException: Error name: ", err.name, " Message: ", err.message);
    console.log("Server shutting down...");
    // close server
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
