import express from "express";
import {
  updateUser,
  getAllUsers,
  getOneUser,
  deleteUser,
} from "../controllers/user.controller.js";
const router = express.Router();

// UPDATE USER ROUTE
router.post("/:id", updateUser);

// GET ALL USERS ROUTE
router.get("/", getAllUsers);

// GET ONE USER ROUTE
router.put("/find/:userId", getOneUser);

// DELETE USER ROUTE
router.delete("/:id", deleteUser);

export default router;