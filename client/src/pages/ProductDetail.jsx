import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axiosInstance from '../utils/axiosInstance';
import './ProductDetail.css'

const ProductDetail = () => {

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();
    const [activeImage, setActiveImage] = useState("");

    useEffect(() => {
        axiosInstance.get(`/products/${id}`)
            .then(res => {
                setProduct(res.data);
                setActiveImage(res.data.images?.[0]?.url)

            })
            .catch(() => alert("Product not found"));
    }, [id]);


    if (!product) return <p>Loading...</p>;
    return (
        <div className="product-detail-page">

            {/* Images */}
            <div className="product-gallery">

                {/* MAIN IMAGE */}
                <div className="main-image">
                    <img
                        src={activeImage}
                        alt={product.title}
                    />
                </div>

                {/* THUMBNAILS */}
                <div className="thumbnail-list">
                    {product.images.map((img, i) => (
                        <img
                            key={i}
                            src={img.url}
                            alt={product.title}
                            className={activeImage === img.url ? "thumbnail active" : "thumbnail"}
                            onClick={() => setActiveImage(img.url)}
                        />
                    ))}
                </div>

            </div>

            {/* Info */}
            <div className="product-detail-info">
                <h2>{product.title}</h2>
                <p className="description">{product.description}</p>

                <h3 className="price">₹{product.price}</h3>

                <p><b>Category:</b> {product.category}</p>
                <p><b>Stock:</b> {product.stock}</p>

                <button
                    className="btn btn-primary"
                    onClick={() => addToCart(product)}
                >
                    Add to Cart
                </button>
            </div>

        </div>
    )
}

export default ProductDetail
