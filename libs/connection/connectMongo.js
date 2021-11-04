const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectMongo = async () => {
   try {
    await mongoose.connect(process.env.mongoURI);  
    console.log("Mongo Connected");
   } catch (error) {
       console.log(error.message);
       process.exit(1);
   }
}

module.exports = connectMongo;