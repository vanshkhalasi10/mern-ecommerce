import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import './AdminProducts.css'

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState("");
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    const navigate = useNavigate();

    const fetchProducts = async () => {
        const res = await axiosInstance.get(
            `/products/admin/all?page=${page}&limit=10`,
            {
                withCredentials: true
            }
        )
        setProducts(res.data.products);
        setPages(res.data.pages)
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
    }, [page]);

    return (
        <div className="admin-products-page">

            <div className="admin-products-header">
                <h2>Admin Products</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/admin/create-product")}
                >
                    + Add Product
                </button>
            </div>

            {message && (
                <p className="success-message">{message}</p>
            )}

            <div className="table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Category</th>
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
                                            className="table-image"
                                        />
                                    )}
                                </td>
                                <td>{p.title}</td>
                                <td>₹{p.price}</td>
                                <td>{p.category}</td>
                                <td>{p.stock}</td>
                                <td className="actions">
                                    <button
                                        className="btn btn-outline"
                                        onClick={() => navigate(`/admin/products/edit/${p._id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(p._id)}
                                    >
                                        Delete
                                    </button>
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
    )
}

export default AdminProducts
