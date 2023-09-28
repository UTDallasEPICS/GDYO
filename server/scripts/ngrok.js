#!/usr/bin/env node
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

// https://philna.sh/blog/2021/03/15/restart-app-not-tunnel-ngrok-nodemon/

if (process.env.NODE_ENV === "production") {
  console.error("Do not use nodemon in production.");
  process.exitCode = 1;
  return;
}

const ngrok = require("ngrok");
const nodemon = require("nodemon");

ngrok
  .connect({
    proto: "http",
    addr: "4000",
  })
  .then((url) => {
    console.log(`ngrok tunnel opened at: ${url}`);

    // nodemon --watch src --ext ts --exec \"npm run start\"
    nodemon({
      watch: "src",
      ext: "ts",
      exec: "npm run start",
    })
      .on("start", () => {
        console.log("\nThe application has started");
      })
      .on("restart", (files) => {
        console.group("\nApplication restarted due to:");
        files.forEach((file) => console.log(file));
        console.groupEnd();
      });
  })
  .catch((error) => {
    console.error("Error opening ngrok tunnel: ", error);
    process.exitCode = 1;
  });
