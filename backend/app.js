// importing libraries
import express from "express";
import cors from "cors";
import { errorHandler, notFound } from "./Middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import bannerRoute from "./routes/banner.route.js";
import userRoute from "./routes/user.route.js";
import orderRoute from "./routes/order.route.js";

// creating instance of express appllcation
const app = express();

// enabling cors
app.use(cors());

// parsing json request bodies
app.use(express.json());

// cookie-parser
app.use(cookieParser());

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/auth/products", productRoute);
app.use("/api/v1/auth/banners", bannerRoute);
app.use("/api/v1/auth/users", userRoute);
app.use("/api/v1/auth/orders", orderRoute)

// error handling middleware
app.use(notFound);
app.use(errorHandler);

// exporting app instance for use in other parts of the project
export default app;