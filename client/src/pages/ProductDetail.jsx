import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axiosInstance from '../utils/axiosInstance';

const ProductDetail = () => {

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const {addToCart} = useCart();

    useEffect(() => {
        axiosInstance.get(`/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(() => alert("Product not found"));
    }, [id]);

 
    if (!product) return <p>Loading...</p>;
    return (
        <div style={{ display: "flex", gap: 30 }}>
            <div>
                {product.images.map((img, i) => (
                    <img
                        key={i}
                        src={img.url}
                        alt={product.title}
                        width="200"
                        style={{ marginRight: 10 }}
                    />
                ))}
            </div>

            <div>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <h3>₹{product.price}</h3>
                <p>Category: {product.category}</p>
                <p>Stock: {product.stock}</p>

                <button onClick={()=>addToCart(product)}>
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default ProductDetail
