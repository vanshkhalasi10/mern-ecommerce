import { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';

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
        console.log(formData)
    };

    const handleImageChange = (e) => {
        setImages(e.target.files)
        console.log(images)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            console.log(data)

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
        <div>
            <h2>Create Product</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name='title'
                    placeholder='Title'
                    onChange={handleChange}
                /><br /><br />

                <textarea
                    name="description"
                    placeholder='Description'
                    onChange={handleChange}
                /><br /><br />

                <input
                    type="text"
                    name="price"
                    placeholder='Price'
                    onChange={handleChange}
                /><br /><br />

                <input
                    type="text"
                    name="category"
                    placeholder='Category'
                    onChange={handleChange}
                /><br /><br />

                <input
                    type="text"
                    name="stock"
                    placeholder='Stock'
                    onChange={handleChange}
                /><br /><br />

                <input type="file" multiple onChange={handleImageChange} /><br /><br />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Product"}
                </button>
            </form>
        </div>
    )
}

export default CreateProduct
