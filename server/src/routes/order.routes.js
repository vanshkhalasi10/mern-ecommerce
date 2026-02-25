const express = require('express');
const { placeOrder, getMyOrders, getAllOrders, updateOrderStatus } = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const router = express.Router();


//user
router.post("/",authMiddleware,placeOrder);
router.get("/my",authMiddleware,getMyOrders);

//admin
router.get("/admin/all",authMiddleware,adminMiddleware,getAllOrders);
router.put("/admin/:id",authMiddleware,adminMiddleware,updateOrderStatus);


module.exports = router