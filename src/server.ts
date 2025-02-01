/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";
import config from "./app/config";

let server: Server;

async function main() {
  try {
    // await mongoose.connect(config.local_url as string);

    await mongoose.connect(config.atlas_url as string);

    // start server
    server = app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  } catch (error) {
    // log any errors that occur during server startup
    console.log(error);
  }
}

// call the main function
main();

// handle unhandled promise rejections
process.on("unhandledRejection", (err: any) => {
  console.log("😡unhandledRejection: Error name: ", err.name, " Message: ", err.message);

  console.log("Server shutting down...");

  // close server
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// handle uncaught exceptions
process.on("uncaughtException", (err: any) => {
  console.log("😡uncaughtException: Error name: ", err.name, " Message: ", err.message);
  console.log("Server shutting down...");

  // close server
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
