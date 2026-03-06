import { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import "./CreateProduct.css";

const CreateProduct = () => {

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        stock: ""
    });

    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImages(e.target.files)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();

            Object.keys(formData).forEach(key => {
                data.append(key, formData[key]);
            });

            for (let i = 0; i < images.length; i++) {
                data.append("images", images[i]);
            }

            const res = await axiosInstance.post("/products/create",
                data,
                {
                    withCredentials: true // 🔥 VERY IMPORTANT
                }
            );

            alert(res.data.message);
            setFormData({
                title: "",
                description: "",
                price: "",
                category: "",
                stock: ""
            });

            setImages([]);


        } catch (error) {
            console.log(error)
            alert(error.response?.data?.message || "Error creating product");
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="create-product-page">

            <h2 className="create-title">Create Product</h2>

            <form className="create-form" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Product title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        placeholder="Product description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-row">

                    <div className="form-group">
                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Stock</label>
                        <input
                            type="number"
                            name="stock"
                            placeholder="Stock"
                            value={formData.stock}
                            onChange={handleChange}
                        />
                    </div>

                </div>

                <div className="form-group">
                    <label>Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="home">Home</option>
                        <option value="sports">Sports</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Images</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Product"}
                    </button>
                </div>

            </form>
        </div>
    )
}

export default CreateProduct
