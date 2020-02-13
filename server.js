// Register babel
require("babel-register");
require("babel-core/register");
require("babel-polyfill");
// load env variables from .env
require("dotenv").config();
const lib = require("./lib");
const instance = process.argv[2] === "worker" ? lib.worker : lib.app.start;
instance();
