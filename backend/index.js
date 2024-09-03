// importing libraries
import app from "./app.js";
import dotenv from "dotenv";
import dbConnection from "./util/db.js";

// loading environmental variables from .env file to process.env object
dotenv.config();

// creating server using PORT
const PORT = process.env.PORT;

// starting the server and listening on port 8000
app.listen(PORT, () =>
{
    console.log(`Server is running on port ${PORT}`);
    dbConnection();
});