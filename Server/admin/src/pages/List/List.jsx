import React, { useState, useEffect } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-hot-toast";

const List = ({url}) => {
 
  const token = "your-auth-token-here"; 
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch list function
  const fetchlist = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      if (res.data.success) {
        setList(res.data.data);
      } else {
        toast.error("Failed to list products. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error("An error occurred while fetching the list.");
    } finally {
      setLoading(false);
    }
  };

  // Remove food function
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(
        `${url}/api/food/remove`,
        { id: foodId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success("Food item removed successfully!");
        setList((prevList) => prevList.filter((item) => item._id !== foodId));
      } else {
        toast.error("Failed to remove the food item.");
      }
    } catch (error) {
      console.error("Error removing food item:", error);
      toast.error("An error occurred while removing the food item.");
    }
  };

  useEffect(() => {
    fetchlist();
  }, []);
  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
