// importing libraries
import app from "./app.js";
import dotenv from "dotenv";
import dbConnection from "./util/db.js";

// loading environmental variables from .env file to process.env object
dotenv.config();

// creating server using PORT
const PORT = process.env.PORT;

app.listen(PORT, ()=>
{
    console.log(`server is running on port ${PORT}`);
    dbConnection();
})