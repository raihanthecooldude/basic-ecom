const config = require("config");
const db = require("./db/db");
const express = require("express");
const router = require("./routes");

// set up database with objection and knex
db();

const app = express();
app.use(express.json());
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is running on port ${port}`));
