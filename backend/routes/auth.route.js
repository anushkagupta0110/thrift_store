// importing libraries
import express from "express";
import {registerUser, loginUser, logOut,} from "../controllers/auth.controller.js";
const router = express.Router();

// registration route 
router.post("/register", registerUser);

// login route
router.post("/login", loginUser);

// logout route
router.get("/logout", logOut);

// exporting
export default router;