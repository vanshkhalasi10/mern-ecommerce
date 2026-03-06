const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/admin.routes');
const productRoutes = require('./routes/product.route');
const orrderRoutes = require('./routes/order.routes');
const cookieParser = require('cookie-parser');

const app = express();


app.use(cors({
  origin:"http://localhost:5173" ,
  credentials: true
}));

app.use(cookieParser())
app.use(express.json());

//routers
app.use('/api/auth',authRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/products',productRoutes);
app.use('/api/orders',orrderRoutes);


app.get("/", (req, res)=> {
    res.send("API is running");
});

module.exports = app;
