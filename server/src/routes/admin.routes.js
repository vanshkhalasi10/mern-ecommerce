const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const { getDashboardStats } = require('../controllers/admin.controller');
const router = express.Router();

router.get("/dashboard",authMiddleware,adminMiddleware,getDashboardStats);

module.exports = router