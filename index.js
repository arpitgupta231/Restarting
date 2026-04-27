const express = require("express");
const connectDB = require("./db.js");
const authrouter = require('./routes/authroutes.js')
require('dotenv').config()

connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", authrouter)

app.listen(3000, () => {
    console.log("server is running");
})
