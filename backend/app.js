// importing libraries
import express from "express";
import cors from "cors";

// creating express application instance
const app = express();

// parsing json request bodies
app.use(express.json());

// enabling cors
app.use(cors())

// exporting app instance to import elsewhere in project
export default app;