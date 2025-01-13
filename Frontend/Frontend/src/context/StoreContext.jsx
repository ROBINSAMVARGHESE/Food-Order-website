import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Context Creation
export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});
    const [food_list, setFoodList] = useState([]);
    const [token, setToken] = useState("");

    // Backend Base URL
    
    // const url = "https://food-order-website-mzss.onrender.com";
    const url = import.meta.env.VITE_URL;
    console.log(url);

    // Add to Cart
    const addToCart = async (itemId) => {
        try {
            // Update local state first
            setCartItems((prev) => ({
                ...prev,
                [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
            }));

            // Sync with backend if token exists
            if (token) {
                await axios.post(
                    `${url}/api/cart/add`,
                    { itemId },
                    { headers: { token } }
                );
            }
        } catch (error) {
            console.error("Error adding item to cart:", error);
            alert("Failed to add item to the cart. Please try again.");
        }
    };

    // Remove from Cart
    const removeFromCart = async (itemId) => {
        try {
            // Update local state first
            setCartItems((prev) => {
                if (prev[itemId] && prev[itemId] > 1) {
                    return { ...prev, [itemId]: prev[itemId] - 1 };
                } else {
                    const { [itemId]: _, ...rest } = prev;
                    return rest;
                }
            });

            // Sync with backend if token exists
            if (token) {
                await axios.post(
                    `${url}/api/cart/remove`,
                    { itemId },
                    { headers: { token } }
                );
            }
        } catch (error) {
            console.error("Error removing item from cart:", error);
            alert("Failed to remove item from the cart. Please try again.");
        }
    };

    // Fetch Food List
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                setFoodList(response.data.data);
            } else {
                alert("Failed to fetch food items.");
            }
        } catch (error) {
            console.error("Error fetching food list:", error);
            alert("Network error while fetching food list.");
        }
    };

    // Load Cart Data
    const loadCartData = async (userToken) => {
        try {
            const response = await axios.post(
                `${url}/api/cart/get`,
                {},
                { headers: { token: userToken } }
            );
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart data:", error);
            alert("Failed to load cart data. Please try again.");
        }
    };

    // Calculate Total Cart Amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const itemInfo = food_list.find((product) => product._id === itemId);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[itemId];
                }
            }
        }
        return totalAmount;
    };

    // Load Initial Data
    useEffect(() => {
        const loadData = async () => {
            try {
                await fetchFoodList();

                const storedToken = localStorage.getItem("token");
                if (storedToken) {
                    setToken(storedToken);
                    await loadCartData(storedToken);
                }
            } catch (error) {
                console.error("Error loading initial data:", error);
            }
        };
        loadData();
    }, []);

    // Context Value
    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
