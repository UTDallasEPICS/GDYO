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
const path = require("path");
const fs = require("fs");

ngrok
  .connect({
    proto: "http",
    addr: "4000",
  })
  .then((url) => {
    console.log(`ngrok tunnel opened at: ${url}`);

    // 1. Write env file in client folder

    const filename = path.join(__dirname, "../../client/.env");

    const exist = fs.existsSync(filename);

    if (exist) {
      fs.readFile(filename, "utf8", function (err, data) {
        if (err) {
          return console.log(err);
        }

        var result = data.replace(
          /EXPO_PUBLIC_API_URL = ".+"/g,
          `EXPO_PUBLIC_API_URL = "${url}"`
        );

        fs.writeFile(filename, result, "utf8", function (err) {
          if (err) return console.log(err);
        });
      });
    } else {
      console.log(
        "\n--- Ngrok Client Env Error: No client `.env` file found. Please run copy-env on client first."
      );
      process.exit(1);
    }

    // 2. nodemon --watch src --ext ts --exec \"npm run start\"
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
