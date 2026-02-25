import { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';

const MyOrders = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axiosInstance.get("/orders/my",
            {
                withCredentials: true
            }
        )
        .then(res=>setOrders(res.data));

    }, []);
    return (
        <div>
            <h2>My Orders</h2>

            {orders.map(order => (
                <div key={order._id} style={{ border: "1px solid #ccc", margin: 10 }}>
                    <p>Status:{order.orderStatus}</p>
                    <p>Total:₹{order.totalAmount}</p>
                    <p>Date:{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    )
}

export default MyOrders
