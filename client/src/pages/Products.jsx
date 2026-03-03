import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import "./Product.css";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");

    useEffect(() => {
        axiosInstance.get(
            `/products?page=${page}&search=${search}&category=${category}&sort=${sort}`
        )
            .then(res => {
                setProducts(res.data.products);
                setPages(res.data.pages);
            });
    }, [page, search, category, sort]);

    return (
        <div className="products-page">
            <div className="products-filters">

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search products... 🔍  "
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />

                {/* Category */}
                <select
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        setPage(1);
                    }}
                >
                    <option value="">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home</option>
                    <option value="sports">Sports</option>
                </select>

                {/* Sort */}
                <select
                    value={sort}
                    onChange={(e) => {
                        setSort(e.target.value);
                        setPage(1);
                    }}
                >
                    <option value="">Sort By</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="latest">Latest</option>
                </select>

            </div>

            <h2 className="products-title">Products</h2>

            <div className="products-grid">
                {products.map(p => (
                    <div key={p._id} className="product-card">

                        <Link to={`/products/${p._id}`} className="product-link">
                            <div className="product-image-wrapper">
                                <img
                                    src={p.images[0].url}
                                    alt={p.title}
                                    className="product-image"
                                />
                            </div>
                            <h4 className="product-title">{p.title}</h4>
                        </Link>

                        <p className="product-price">₹{p.price}</p>
                    </div>
                ))}
            </div>

            {/* Pagination */}
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

export default Products
