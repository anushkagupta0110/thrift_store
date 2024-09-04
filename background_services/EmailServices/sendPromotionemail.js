// import ejs from "ejs";
// import dotenv from "dotenv";
// import sendMail from "../helpers/sendMail.js";
// import Product from "../models/product.model.js";
// import User from "../models/user.model.js";
// import Order from "../models/order.model.js";
// dotenv.config();

// const sendPromotionEmail = async () => {

//   const users = await User.find();
//   const products = await Product.aggregate([
//     { $sample: { size: 5 } },
//   ]);
  
//   if (products.length > 0) {
//     for (let user of users) {
//       ejs.renderFile(
//         "templates/promotion.ejs",
//         { products },
//         async (err, data) => {
//           let messageoption = {
//             from: process.env.EMAIL,
//             to: user.email,
//             subject: "Products for the month.",
//             html: data,
//           };

//           try {
//             await sendMail(messageoption);
//           } catch (error) {
//             console.log(err);
//           }
//         }
//       );
//     }
//   }
// };

// export default sendPromotionEmail;

import ejs from "ejs";
import dotenv from "dotenv";
import path from "path";
import sendMail from "../helpers/sendMail.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

dotenv.config();

const sendPromotionEmail = async () => {
  try {
    const users = await User.find();
    const products = await Product.aggregate([{ $sample: { size: 5 } }]); // Select 5 random products
    
    if (products.length > 0) {
      const emailPromises = users.map(async (user) => {
        try {
          const data = await ejs.renderFile(
            path.join(__dirname, '../templates/promotion.ejs'),
            { products }
          );

          let messageoption = {
            from: process.env.EMAIL,
            to: user.email,
            subject: "Products for the month.",
            html: data,
          };

          await sendMail(messageoption); // Await sendMail to ensure it completes
        } catch (error) {
          console.log(`Error rendering EJS for user ${user.email}:`, error);
        }
      });

      await Promise.all(emailPromises); // Wait for all emails to be sent
    }
  } catch (error) {
    console.error("Error sending promotion emails:", error);
  }
};

export default sendPromotionEmail;
