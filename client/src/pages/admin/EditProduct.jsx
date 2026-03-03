import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import './EditProduct.css';

const EditProduct = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: ""
  });

  useEffect(() => {
    axiosInstance.get(`/products/${id}`)
      .then(res => setFormData({
        title: res.data.title,
        description: res.data.description,
        price: res.data.price,
        category: res.data.category,
        stock: res.data.stock
      }))
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axiosInstance.put(
      `/products/admin/${id}`,
      formData,
      { withCredentials: true }
    );

    alert("Product Updated Successfully");
    navigate("/admin/products");
  }


  return (
    <div className="edit-product-page">

      <h2 className="edit-title">Edit Product</h2>

      <form className="edit-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
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
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              name="stock"
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

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Update Product
          </button>

          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate("/admin/products")}
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  )
}

export default EditProduct
