const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const getDashboardStats = async (req, res) => {
    try {
        const users = await User.countDocuments();
        const products = await Product.countDocuments();
        const orders = await Order.countDocuments();
        const pendingOrders = await Order.countDocuments({
            orderStatus: "Pending"
        });

        res.json({
            users,
            products,
            orders,
            pendingOrders
        })
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getDashboardStats }