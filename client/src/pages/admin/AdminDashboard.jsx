import  { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';

const AdminDashboard = () => {

    const [stats, setStats] = useState({});

    useEffect(() => {
        axiosInstance.get("/admin/dashboard",
            { withCredentials: true }
        )
        .then(res=>setStats(res.data));
    }, [])
    return (
        <div>
            <h2>Admin Dashboard</h2>

            <div style={{ display: "flex", gap: 20 }}>
                <div>Users:{stats.users}</div>
                <div>Products:{stats.products}</div>
                <div>Orders:{stats.orders}</div>
                <div>Pending Orders:{stats.pendingOrders}</div>
            </div>
        </div>
    )
}

export default AdminDashboard
