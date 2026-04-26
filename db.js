const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB CONNECTED SUCCESFULLY");
    }
    catch(err){
        console.error(err);
        process.exit(2);
    }
}

module.exports = connectDB;