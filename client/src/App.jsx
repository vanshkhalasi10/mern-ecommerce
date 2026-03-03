import './App.css'
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from './components/layout/Navbar';

//auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import VerifyEmail from './pages/auth/VerifyEmail';


//user pages
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';


//admin pages
import CreateProduct from './pages/admin/CreateProduct';
import AdminProducts from './pages/admin/AdminProducts';
import EditProduct from './pages/admin/EditProduct';
import AdminOrders from './pages/admin/AdminOrders';
import AdminDashboard from './pages/admin/AdminDashboard';

//home page
import Home from './pages/Home';
import PrivateRoute from './components/common/PrivateRoute';


function App() {

  const location = useLocation();

  // 🔥 Navbar sirf AUTH pages pe hide hoga
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/verify-email";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* Public */}
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<ProductDetail />} />


        {/* Auth */}
        <Route path='/login' element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/verify-email' element={<VerifyEmail />} />

        {/* User */}
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        } />
        <Route path='/orders' element={
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        } />


        {/* Admin */}
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/create-product' element={<CreateProduct />} />
        <Route path='/admin/products' element={<AdminProducts />} />
        <Route path='admin/products/edit/:id' element={<EditProduct />} />
        <Route path='/admin/orders' element={<AdminOrders />} />
      </Routes>

    </>
  )
}

export default App
