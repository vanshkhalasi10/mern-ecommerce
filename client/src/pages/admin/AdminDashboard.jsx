import { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { FaUsers, FaBoxOpen, FaShoppingCart, FaClock } from "react-icons/fa";
import './AdminDashboard.css'

const AdminDashboard = () => {

    const [stats, setStats] = useState({});

    useEffect(() => {
        axiosInstance.get("/admin/dashboard",
            { withCredentials: true }
        )
            .then(res => setStats(res.data));
    }, [])
    return (
        <div className="admin-dashboard">

            <h2 className="admin-title">Admin Dashboard</h2>

            <div className="stats-grid">

                <div className="stat-card">
                    <div className="stat-icon users">
                        <FaUsers />
                    </div>
                    <p className="stat-label">Users</p>
                    <h3 className="stat-value">{stats.users}</h3>
                </div>

                <div className="stat-card">
                    <div className="stat-icon products">
                        <FaBoxOpen />
                    </div>
                    <p className="stat-label">Products</p>
                    <h3 className="stat-value">{stats.products}</h3>
                </div>

                <div className="stat-card">
                    <div className="stat-icon orders">
                        <FaShoppingCart />
                    </div>
                    <p className="stat-label">Orders</p>
                    <h3 className="stat-value">{stats.orders}</h3>
                </div>

                <div className="stat-card pending">
                    <div className="stat-icon pending">
                        <FaClock />
                    </div>
                    <p className="stat-label">Pending Orders</p>
                    <h3 className="stat-value">{stats.pendingOrders}</h3>
                </div>

            </div>

        </div>
    )
}

export default AdminDashboard
