import './App.css'
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import VerifyEmail from './pages/auth/VerifyEmail';

import { Routes, Route } from "react-router-dom";
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import CreateProduct from './pages/admin/CreateProduct';
import AdminProducts from './pages/admin/AdminProducts';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import AdminOrders from './pages/admin/AdminOrders';
import EditProduct from './pages/admin/EditProduct';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<ProductDetail />} />
        <Route path='/admin/create-product' element={<CreateProduct />} />
        <Route path='/admin/products' element={<AdminProducts />} />
        <Route path='admin/products/edit/:id' element={<EditProduct />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/orders' element={<MyOrders />} />
        <Route path='/admin/orders' element={<AdminOrders />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
      </Routes>
    </>
  )
}

export default App
