import React from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {

    const { cart, removeFromCart, updateQty } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) return <h3>Cart is empty</h3>
    return (
        <div>
            <h2>Your Cart</h2>
            {cart.map(item => (
                <div
                    key={item._id}
                    style={{
                        display: "flex",
                        gap: 20,
                        border: "1px solid #ccc",
                        padding: 15,
                        marginBottom: 20,
                        alignItems: "center"
                    }}
                >

                    <img
                        src={item.images[0]?.url}
                        alt={item.title}
                        width="100"
                        height="100"
                        style={{ objectFit: "cover", borderRadius: 6 }}
                    />

                    <div style={{ flex: 1 }}>
                        <h4>{item.title}</h4>
                        <p>Price: ₹{item.price}</p>

                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

                            <button onClick={() => updateQty(item._id, item.qty - 1)} >
                                -
                            </button>
                            <span>{item.qty}</span>
                            <button onClick={() => updateQty(item._id, item.qty + 1)}>
                                +
                            </button>
                        </div>

                        <p style={{ marginTop: 5 }}>
                            Item Total: ₹{item.price * item.qty}
                        </p>
                    </div>

                    <button onClick={() => removeFromCart(item._id)}>
                        Remove
                    </button>
                </div>
            ))}
          <button onClick={()=>navigate("/checkout")}>
            Proceed to checkout
          </button>
        </div>
    );
};

export default Cart;
