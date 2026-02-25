import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const Products = () => {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    useEffect(() => {
        axiosInstance.get(`/products?page=${page}`)
            .then(res => {
                setProducts(res.data.products);
                setPages(res.data.pages);
            });
    }, [page]);

    return (
        <div>
            <h2>Products</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
                {products.map(p => (
                    <div key={p._id} style={{ border: "1px solid #ccc", padding: 10 }}>

                        <Link to={`/products/${p._id}`}>
                            {p.images?.[0] && (

                                <img
                                    src={p.images[0].url}
                                    alt={p.title}
                                    width="100%"
                                />
                            )}
                            <h4>{p.title}</h4>
                        </Link>
                        <p>₹{p.price}</p>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: 20 }}>
                <button disabled={page === 1} onClick={() => { setPage(page - 1) }}>
                    Prev
                </button>

                <span style={{ margin: "0 10px" }}>
                    Page {page} of {pages}
                </span>

                <button disabled={page === pages} onClick={() => { setPage(page + 1) }}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default Products
