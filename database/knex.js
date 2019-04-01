require("dotenv").config();

const config = require("../knexfile.js")[process.env.DATABASE || "mysql"];
module.exports = require("knex")(config);