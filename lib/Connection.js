const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const ConnectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = ConnectDB
