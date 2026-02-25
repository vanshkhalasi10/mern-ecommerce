import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const fetchProducts = async () => {
        const res = await axiosInstance.get(
            "/products/admin/all",
            {
                withCredentials: true
            }
        )
        setProducts(res.data)
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this product?")) return;

        const res = await axiosInstance.delete(
            `/products/admin/${id}`,
            {
                withCredentials: true
            }
        );
        setMessage(res.data.message);
        fetchProducts();
    };

    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <div>
            <h2>Admin Products</h2>
            {message && (
                <p style={{ color: "green", marginBottom: "10px" }}>
                    {message}
                </p>
            )}

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Categpory</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map(p => (
                        <tr key={p._id}>
                            <td>
                                {p.images?.[0] && (
                                    <img
                                        src={p.images[0].url}
                                        alt={p.title}
                                        width="50"
                                        height="50"
                                        style={{ objectFit: "cover" }}
                                    />
                                )}
                            </td>
                            <td>{p.title}</td>
                            <td>{p.price}</td>
                            <td>{p.category}</td>
                            <td>{p.stock}</td>
                            <td>
                                <button onClick={() => handleDelete(p._id)}>
                                    Delete
                                </button>
                                <button onClick={() => navigate(`/admin/products/edit/${p._id}`)}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminProducts
