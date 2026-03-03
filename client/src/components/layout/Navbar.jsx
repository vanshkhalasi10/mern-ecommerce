import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const { totalQty } = useCart();

  if (loading) return null;

  const isAdmin = user?.role === "admin";

  const handleLogout = async () => {
    await logout();      // context clear
    navigate("/login");  // 🔥 redirect
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">


        {/* Logo */}
        <Link to="/" className="navbar-logo">
          MERN<span>Shop</span>
        </Link>

        {/* CENTER LINKS */}
        <div className="navbar-links">

          {/* Common */}

           {!isAdmin && (
            <>
             <NavLink to="/" end>Home</NavLink>
             <NavLink to="/products">Products</NavLink>
             
            </>
          )}


          {/* USER ONLY */}
          {user && !isAdmin && (
            <NavLink to="/orders">My Orders</NavLink>
          )}

          {/* ADMIN ONLY */}
          {isAdmin && (
            <>
              <NavLink to="/admin/dashboard">Dashboard</NavLink>
              <NavLink to="/admin/products">Products</NavLink>
              <NavLink to="/admin/orders">Orders</NavLink>
            </>
          )}

        </div>

        {/* RIGHT SIDE */}
        <div className="navbar-actions">

          {!isAdmin && (
            <NavLink to="/cart" className="cart-link">
              <span className="cart-icon">🛒</span>
              {totalQty > 0 && <span className="cart-badge">{totalQty}</span>}
            </NavLink>
          )}

          {!user ? (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="btn btn-outline">
              Logout
            </button>
          )}

          {isAdmin && <span className="admin-badge">Admin</span>}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;