const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const isExists = await User.findOne({ email });

        if (isExists) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const newUser = await User.create({
            name,
            email,
            password,
        });

        res.status(201).json({
            message: "Registered Successfully",
            email
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "server error" });
    }
};

const sendOtp = async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user || user.isVerified) {
            return res.status(400).json({ message: "Invalid Request" });
        }

        const otp = crypto.randomInt(100000, 999999).toString();
        const hashedOtp = await bcrypt.hash(otp, 10);

        user.otp = hashedOtp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000;
        user.lastOtpSentAt = Date.now();
        await user.save();

        sendEmail(
            email,
            "Verify Email",
            `Your  OTP is ${otp}. It will expires in 10 minutes`
        );
        res.json({ message: 'OTP Sent to email' });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const verifyOtp = async (req, res) => {

    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user || !user.otp) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        const isOtpValid = await bcrypt.compare(otp, user.otp)

        if (!isOtpValid || user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        user.lastOtpSentAt = undefined;
        await user.save();

        res.json({ message: "Email verified successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }

};

const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "User already verified" });
        }

        const ONE_MINUTE = 60 * 1000;

        if (user.lastOtpSentAt && Date.now() - user.lastOtpSentAt < ONE_MINUTE) {
            return res.status(400).json({
                message: "Please wait 1 minute before requesting another otp"
            });
        }

        const otp = crypto.randomInt(100000, 999999).toString();

        const hashedOtp = await bcrypt.hash(otp, 10);

        user.otp = hashedOtp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000;
        user.lastOtpSentAt = Date.now();
        await user.save();

        await sendEmail(
            email,
            "Resend OTP - Email Verification",
            `Your OTP is ${otp}. it will expire in 10 minutes`
        );

        res.json({ message: "OTP resent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All Fileds Required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (!user.isVerified) {
            return res.status(400).json({ message: "Please verify your email first" });
        }


        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }


        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
        );
        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,              // true in production
            sameSite: isProduction ? "None" : "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        
        res.cookie("token", token, cookieOptions);

        res.json({
            message: "Login Successfull",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);

    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
};

const getMe = async (req, res) => {
    res.status(200).json({
        user: req.user,
    });
};

const logoutUser = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expiresIn: new Date(0),
    });

    res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { register, login, getProfile, verifyOtp, sendOtp, resendOtp, getMe, logoutUser }