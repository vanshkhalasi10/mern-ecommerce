const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                tilte: String,
                price: Number,
                qty: Number
            }
        ],
        totalAmount: {
            type: Number,
            required: true
        },
        orderStatus: {
            type: String,
            enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Pending"
        },
        paymentMethod: {
            type: String,
            default: "COD"
        },
        isPaid: {
            type: Boolean,
            deafault: false
        }
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order