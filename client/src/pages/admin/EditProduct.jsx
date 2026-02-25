import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
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
    <div>
      <h2>Edit Product</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name='title' value={formData.title} onChange={handleChange} />
        <textarea
          name=""
          value={formData.description}
          onChange={handleChange}
        />
        <input type="text" name='price' value={formData.price} onChange={handleChange} />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
        <input type="text" name='stock' value={formData.stock} onChange={handleChange} />

        <button type='submit'>Update Product</button>
      </form>
    </div>
  )
}

export default EditProduct
