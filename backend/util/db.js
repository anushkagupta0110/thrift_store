// importing libraries
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// connecting mongoDB
const dbConnection = async ()=>
{
    const DB = process.env.DB;
    try
    {
        await mongoose.connect(DB).then( ()=>
        {
            console.log("database is connected successfully");
        })
    }
    catch(error)
    {
        console.log(error);
        setTimeout(dbConnection, 5000);
    }
};

export default dbConnection;