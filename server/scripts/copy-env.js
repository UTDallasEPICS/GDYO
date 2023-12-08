/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require("fs");
const path = require("path");

if (!fs.existsSync(path.join(__dirname, ".env"))) {
  // File destination will be created or overwritten by default.
  fs.copyFileSync(
    path.join(__dirname, ".env.example"),
    path.join(__dirname, "../.env")
  );
  console.log("[Env] Environment file .env is created.");
}
