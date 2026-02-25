const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');


const createProduct = async (req, res) => {
    try {

        const { title, description, price, category, stock } = req.body;
        console.log(req.body)


        if (!title || !description || !price || !category) {
            return res.status(400).json({ message: "All fields required" });
        }

        let imageUrls = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "mern_products"
                });
                imageUrls.push({
                    url: result.secure_url,
                    public_id: result.public_id
                });
            }
        }

        const product = await Product.create({
            title,
            description,
            price,
            category,
            stock,
            images: imageUrls,
            createdBy: req.user.id
        });

        res.status(201).json({
            message: "Product created successfully",
            product
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error " });
    }
};

const getAllProduct = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 8;
        const search = req.query.search || "";

        const query = {
            title: { $regex: search, $options: "i" }
        };

        const total = await Product.countDocuments(query);

        const products = await Product.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });

        res.json({
            products,
            total,
            page,
            pages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error " })
    }
};


const getSingleProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }


        res.json(product);


    } catch (error) {
        return res.status(500).json({ message: "Server Error" })
    };

};

const getAdminProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {

        return res.status(500).json({ message: "Server Error" });
    }
};


const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.images && product.images.length > 0) {
            try {
                for (const img of product.images) {
                    await cloudinary.uploader.destroy(img.public_id)
                }
            } catch (error) {
                console.error("Cloudinary error:", err);
            }
        }

        await product.deleteOne();
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            message: "Product updated successfully",
            product: updatedProduct
        })
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    getAdminProducts,
    deleteProduct,
    updateProduct
}