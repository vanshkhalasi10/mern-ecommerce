const express = require('express');
const { register, login, getProfile, verifyOtp, sendOtp, resendOtp } = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();


router.post('/register',register);
router.post("/send-otp",sendOtp);
router.post("/verify-otp",verifyOtp);
router.post("/resend-otp",resendOtp);
router.post('/login',login);
router.get("/profile",authMiddleware,getProfile);

module.exports = router