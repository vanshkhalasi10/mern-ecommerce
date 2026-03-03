import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import './Checkout.css'


const Checkout = () => {

    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    const totalAmount = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );


    const placeOrder = async () => {
        try {

            const orderItems = cart.map(item => ({
                product: item._id,
                title: item.title,
                price: item.price,
                qty: item.qty
            }));

            const res = await axiosInstance.post(
                "/orders",
                { orderItems, totalAmount },
                {
                    withCredentials: true
                }
            );

            clearCart();
            alert("Order placed successfully");
            navigate("/orders")
        } catch (error) {
            alert(error.response?.data?.message || "Order failed");
        }
    }

    if (cart.length === 0) return <h3>No items in cart</h3>;


    return (
        <div className="checkout-page">

            <h2 className="checkout-title">Checkout</h2>

            <div className="checkout-card">

                <div className="checkout-items">
                    {cart.map(item => (
                        <div key={item._id} className="checkout-item">
                            <span className="item-title">
                                {item.title} × {item.qty}
                            </span>
                            <span className="item-price">
                                ₹{item.price * item.qty}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="checkout-total">
                    <span>Total</span>
                    <span>₹{totalAmount}</span>
                </div>

                <button
                    className="btn btn-primary checkout-btn"
                    onClick={placeOrder}
                >
                    Place Order
                </button>

            </div>
        </div>
    )
}

export default Checkout
