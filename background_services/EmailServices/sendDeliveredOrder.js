// import ejs from "ejs";
// import dotenv from "dotenv";
// import sendMail from "../helpers/sendMail.js";
// import Order from "../models/order.model.js";

// dotenv.config();

// const sendDeliveredOrder = async () => {
//  const orders = await Order.find({status:2});
//   if (orders.length > 0) {
//     for (let order of orders) {
//       ejs.renderFile(
//         "templates/deliveredorder.ejs",
//         {name: order.name, products : order.products},
//         async (err, data) => {
//           let messageoption = {
//             from: process.env.EMAIL,
//             to: order.email,
//             subject: "Your order has been delivered.",
//             html: data,
//           };
//           try {
//             await sendMail(messageoption);
//             await Order.findByIdAndUpdate(order._id, { $set: {status: 3} });
//           } catch (error) {
//             console.log(err);
//           }
//         }
//       );
//     }
//   }
// };
// export default sendDeliveredOrder;

import ejs from "ejs";
import dotenv from "dotenv";
import path from "path";
import sendMail from "../helpers/sendMail.js";
import Order from "../models/order.model.js";

dotenv.config();

const sendDeliveredOrder = async () => {
  const orders = await Order.find({ status: 2 });
  
  if (orders.length > 0) {
    const emailPromises = orders.map(async (order) => {
      try {
        const data = await ejs.renderFile(
          path.join(__dirname, '../templates/deliveredorder.ejs'),
          { name: order.name, products: order.products }
        );

        let messageoption = {
          from: process.env.EMAIL,
          to: order.email,
          subject: "Your order has been delivered.",
          html: data,
        };

        await sendMail(messageoption);
        await Order.findByIdAndUpdate(order._id, { $set: { status: 3 } });
      } catch (error) {
        console.log(`Error processing order ${order._id}:`, error);
      }
    });

    await Promise.all(emailPromises); // Wait for all emails to be sent
  }
};

export default sendDeliveredOrder;