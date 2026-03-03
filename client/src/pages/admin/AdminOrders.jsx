import { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import './AdminOrders.css';

const AdminOrders = () => {

    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    const fetchOrders = async () => {
        const res = await axiosInstance.get(
            `/orders/admin/all?page=${page}&limit=10`,
            {
                withCredentials: true
            }
        );

        setOrders(res.data.orders);
        setPages(res.data.pages);
    };

    const updateStatus = async (id, newStatus, oldStatus) => {

        if (newStatus == oldStatus) return;

        const confirmed = window.confirm(
            `Change order status from "${oldStatus} to "${newStatus}" ?`
        );

        if (!confirmed) return;

        try {
            await axiosInstance.put(
                `/orders/admin/${id}`,
                { status: newStatus },
                { withCredentials: true }
            );
            fetchOrders();
        } catch (error) {
            alert("Failed to update status");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [page])


    return (
        <div className="admin-orders-page">

            <h2 className="admin-orders-title">Admin Orders</h2>

            <div className="table-wrapper">
                <table className="admin-table">

                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Update Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>

                                <td>{order.user?.name}</td>
                                <td>{order.user?.email}</td>
                                <td>₹{order.totalAmount}</td>

                                <td>
                                    <span className={`status ${order.orderStatus.toLowerCase()}`}>
                                        {order.orderStatus}
                                    </span>
                                </td>

                                <td>
                                    <select
                                        className="status-select"
                                        value={order.orderStatus}
                                        onChange={(e) =>
                                            updateStatus(order._id, e.target.value, order.orderStatus)
                                        }
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
            <div className="pagination">

                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Prev
                </button>

                <span>
                    Page {page} of {pages}
                </span>

                <button
                    disabled={page === pages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>

            </div>

        </div>
    );
};

export default AdminOrders
