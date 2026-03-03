import { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import './MyOrders.css'

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
        <div className="orders-page">

      <h2 className="orders-title">My Orders</h2>

      <div className="orders-list">
        {orders.map(order => (
          <div key={order._id} className="order-card">

            <div className="order-row">
              <span>Status</span>
              <span className={`status ${order.orderStatus.toLowerCase()}`}>
                {order.orderStatus}
              </span>
            </div>

            <div className="order-row">
              <span>Total</span>
              <span>₹{order.totalAmount}</span>
            </div>

            <div className="order-row">
              <span>Date</span>
              <span>
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

          </div>
        ))}
      </div>

    </div>
    )
}

export default MyOrders
