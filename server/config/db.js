import mongoose from "mongoose";
import "dotenv/config";

const DATABASE_URL = process.env.DATABASE_URL;

// const port = process.env.PORT;
// console.log(`Your port is ${DATABASE_URL}`);
mongoose.set("strictQuery", false);
const connectDB = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: process.env.DBNAME,
      user: process.env.DBUSERNAME,
      pass: process.env.DBPASSWORd,
      authSource: process.env.DBAUTHSOURCE,
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Db Connected Successfully...");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
