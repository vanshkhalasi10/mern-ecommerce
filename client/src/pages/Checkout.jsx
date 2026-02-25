import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";


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

    if(cart.length===0) return <h3>No items in cart</h3>;


    return (
        <div>
            <h2>Checkout</h2>
            {cart.map(item => (
                <div key={item._id}>
                    <p>
                        {item.title} x {item.qty} =  ₹{item.price * item.qty}
                    </p>
                </div>
            ))}

            <h3>Total: ₹{totalAmount}</h3>

            <button onClick={placeOrder}>Place Order</button>
        </div>
    )
}

export default Checkout
