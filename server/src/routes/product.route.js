const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const { createProduct, getAllProduct, getSingleProduct, getAdminProducts, deleteProduct, updateProduct } = require('../controllers/product.controller');
const upload = require('../middlewares/upload.middleware');

const router = express.Router();

router.post("/create",authMiddleware,adminMiddleware,upload.array("images",5),createProduct);
router.get("/",getAllProduct);
router.get("/:id",getSingleProduct);
router.get("/admin/all",getAdminProducts);
router.delete("/admin/:id",authMiddleware,adminMiddleware,deleteProduct);
router.put("/admin/:id",authMiddleware,adminMiddleware,updateProduct);

module.exports = router