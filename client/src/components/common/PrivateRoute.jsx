import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    // 🔄 auth check complete hone ka wait
    if (loading) return null;

    // ❌ not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // ✅ logged in
    return children;

}

export default PrivateRoute
