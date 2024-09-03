import express from "express";
const router = express.Router();
import {
  createOrder,
  updateOrder,
  getAllOrders,
  deleteOrder,
  getUserOrder,
} from "../controllers/order.controller.js";
import protect from "../Middleware/auth.middleware.js";

// CREATE ORDER ROUTE
router.post("/", createOrder);
//UPDATE ORDER ROUTE
router.put("/:id", updateOrder);
//GET ALL ORDERS ROUTE
router.get("/", protect, getAllOrders);
// GET ORDER STATS ROUTE

// DELETE ORDER ROUTE
router.delete("/:id", deleteOrder);
//GET USER ORDERS ROUTE
router.get("/find/:id", getUserOrder);

export default router;