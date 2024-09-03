import express from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  ratingProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
// import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// create product route (protected)
router.post("/", createProduct);

// get all products route
router.get("/", getAllProducts);

// get one product route
router.get("/find/:id", getProduct);

// update product route (protected)
router.put("/:id", updateProduct);

// rating product route (protected)
router.put("/ratings/:productId", ratingProduct);

// delete product route (protected)
router.delete("/:id", deleteProduct);

export default router;
