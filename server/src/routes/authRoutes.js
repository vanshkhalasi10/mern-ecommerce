const express = require('express');
const { register, login, getProfile, verifyOtp, sendOtp, resendOtp, getMe, logoutUser } = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();


router.post('/register',register);
router.post("/send-otp",sendOtp);
router.post("/verify-otp",verifyOtp);
router.post("/resend-otp",resendOtp);
router.post('/login',login);
router.get("/profile",authMiddleware,getProfile);
router.get("/me",authMiddleware,getMe);
router.post("/logout",logoutUser);

module.exports = router