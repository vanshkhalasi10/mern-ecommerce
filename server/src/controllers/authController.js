const User = require('../models/User')

const register = async (req,res) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body)

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const isExists = await User.findOne({ email });

        console.log(isExists)
        if (isExists) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const newUser = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            message: "User registered successfully",
            userId: newUser._id
        });


    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

module.exports = {register}