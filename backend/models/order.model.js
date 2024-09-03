// importing libraries
import mongoose from "mongoose";

// specifying schema for order
const OrderSchema = mongoose.Schema(
    {
        name:
        {
            type: String,
            require: true
        },
        userId:
        {
            type: String,
            require: true
        },
        products:
        {
            type: Array,
            require: true
        },
        total:
        {
            type: Number,
            require: true
        },
        address:
        {
            type: String
        },
        phone:
        {
            type: String
        },
        email:
        {
            type: String
        },
        status:
        {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

// creating mongoosse model and exporting order
const Order = mongoose.model("Order", OrderSchema);
export default Order;