import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-hot-toast";

const Add = ({url}) => {
 
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      const maxSize = 2 * 1024 * 1024; 

      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload a JPEG or PNG image.");
        return;
      }

      if (file.size > maxSize) {
        toast.error("File size exceeds the limit of 2 MB.");
        return;
      }

      setImage(file);
      toast.success("Image selected successfully!");
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("discount", Number(data.discount));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          discount: "",
          category: "Salad",
        });
        setImage(false);
        toast.success("Product added successfully!");
      } else {
        toast.error("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload Area"
            />
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows={6}
            placeholder="Write content here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
              required
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Biryani">Biryani</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <div className="price-input">
              <input
                onChange={onChangeHandler}
                value={data.price}
                type="number"
                name="price"
                placeholder="₹20"
                required
              />
            </div>
          </div>
          <div className="add-price flex-col">
            <p>Discount</p>
            <div className="discount-input">
              <input
                onChange={onChangeHandler}
                value={data.discount}
                type="number"
                name="discount"
                placeholder="Enter discount (%)"
                required
              />
            </div>
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;

