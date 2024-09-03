// importing necessary libraries
import Order from "../models/order.model.js";
import asyncHandler from "express-async-handler";

// creating order
const createOrder = asyncHandler(async (req, res) =>
{
    // creating a new order instance
    const newOrder = Order(req.body);

    // saving the order in database
    const savedOrder = await newOrder.save();

    if (!savedOrder)
    {
        res.status(400);
        throw new Error("Order was not created");
    }
    else
    {
        res.status(200).json(savedOrder);
    }
});

// updating order
const updateOrder = asyncHandler(async (req, res) =>
{
    // finding and updating the order in database
    const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    );

    if (!updatedOrder)
    {
        res.status(400);
        throw new Error("Order was not updated");
    }
    else
    {
        res.status(200).json(updatedOrder);
    }
});

// deleting order
const deleteOrder = asyncHandler(async (req, res) =>
{
    // finding and deleting the order from the database
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order)
    {
        res.status(400);
        throw new Error("Order was not deleted");
    }
    else
    {
        res.status(200).json("Order is deleted successfully");
    }
});

// getting user orders
const getUserOrder = asyncHandler(async (req, res) =>
{
    // retrieving all orders for a specific user
    const orders = await (await Order.find({ userId: req.params.id })).reverse();

    if (!orders)
    {
        res.status(400);
        throw new Error("No order is found");
    }
    else
    {
        res.status(200).json(orders);
    }
});

// getting all orders
const getAllOrders = asyncHandler(async (req, res) =>
{
    // retrieving all orders
    const orders = await Order.find();

    if (!orders)
    {
        res.status(400);
        throw new Error("No orders found");
    }
    else
    {
        res.status(200).json(orders);
    }
});

// exporting
export { getAllOrders, updateOrder, deleteOrder, getUserOrder, createOrder };