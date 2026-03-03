import React from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom';
import './Cart.css'

const Cart = () => {

    const { cart, removeFromCart, updateQty } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) return <h3>Cart is empty</h3>
    return (
        <div className="cart-page">

            <h2 className="cart-title">Your Cart</h2>

            <div className="cart-list">
                {cart.map(item => (
                    <div key={item._id} className="cart-item">

                        <img
                            src={item.images[0]?.url}
                            alt={item.title}
                            className="cart-item-image"
                        />

                        <div className="cart-item-info">
                            <h4>{item.title}</h4>
                            <p className="price">₹{item.price}</p>

                            <div className="qty-box">
                                <button onClick={() => updateQty(item._id, item.qty - 1)}>−</button>
                                <span>{item.qty}</span>
                                <button onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
                            </div>

                            <p className="item-total">
                                Item Total: ₹{item.price * item.qty}
                            </p>
                        </div>

                        <button
                            className="remove-btn"
                            onClick={() => removeFromCart(item._id)}
                        >
                            Remove
                        </button>

                    </div>
                ))}
            </div>

            <div className="cart-footer">
                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/checkout")}
                >
                    Proceed to Checkout
                </button>
            </div>

        </div>
    );
};

export default Cart;
