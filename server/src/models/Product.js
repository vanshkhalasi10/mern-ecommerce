const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        images: [
            {
                url: String,
                public_id: String

            }
        ],
        category: {
            type: String,
            enum:["electronics","fashion","home","sports"],
            required: true,
        },
        stock: {
            type: Number,
            default: 0,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product