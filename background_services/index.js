import express from "express";
import dotenv from "dotenv";
import dbConnection from "./utils/db.js";
import cron from "node-cron";
import sendWelcomeEmail from "./EmailServices/sendWelcomeEmail.js";
import sendPendingOrderEmail from "./EmailServices/sendPendingOrderEmail.js";
import sendDeliveredOrder from "./EmailServices/sendDeliveredOrder.js";
import sendPromotionEmail from "./EmailServices/sendPromotionemail.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// sheduling services
const services = () => {
    cron.schedule("* * * * * *", async () => {
        sendWelcomeEmail();
        sendPendingOrderEmail();
        sendDeliveredOrder();
    });
  };

const promotion = () =>
{
  cron.schedule("30 5 * * 5", () =>
  {
      sendPromotionEmail
  })
}
  
  services();

app.listen(PORT, () => {
  console.log(`backgroundServices is running on port ${PORT}`);
  dbConnection();
});