import { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';

const AdminOrders = () => {

    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const res = await axiosInstance.get(
            "/orders/admin/all",
            {
                withCredentials: true
            }
        );

        setOrders(res.data);
    };

    const updateStatus = async (id, status) => {
        await axiosInstance.put(
            `/api/orders/admin/${id}`,
            { status },
            { withCredentials: true }
        );
        fetchOrders();
    };

    useEffect(() => {
        fetchOrders();
    }, [])


    return (
        <div>
            <h2>Admin Orders</h2>

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Update</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order.user?.name}</td>
                            <td>{order.user?.email}</td>
                            <td>₹{order.totalAmount}</td>
                            <td>{order.orderStatus}</td>
                            <td>
                                <select
                                    value={order.orderStatus}
                                    onChange={(e) => updateStatus(order._id, e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminOrders
