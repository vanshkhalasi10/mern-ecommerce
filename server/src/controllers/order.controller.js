const Order = require("../models/Order");

const placeOrder = async (req, res) => {
    try {
        const { orderItems, totalAmount } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: "No order items" });
        }

        const order = await Order.create({
            user: req.user.id,
            orderItems,
            totalAmount
        });

        res.status(201).json({
            message: "Order Placed successfully.",
            order
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

//User order history
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

//admin all orders

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.json(orders)

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if(!order){
            return res.status(404).json({message:"Order not found"});
        }

        order.orderStatus = req.body.status || order.orderStatus;
        await order.save();

        res.json({
            message:"Order status updated",
            order
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { placeOrder, getMyOrders, getAllOrders,updateOrderStatus }