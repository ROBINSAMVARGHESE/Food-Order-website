import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});
    const url = "https://foodorderwebsite-be.onrender.com"
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
        }));
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            if (prev[itemId] && prev[itemId] > 1) {
                return { ...prev, [itemId]: prev[itemId] - 1 };
            } else {
                const { [itemId]: _, ...rest } = prev;
                return rest;
            }
        });
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }
    };

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        if (response.data.success) {
            setFoodList(response.data.data);
        } else {
            alert("Error! Products are not fetching..");
        }
    };


    const loadCardData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCartItems(response.data.cartData);
    };


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCardData(localStorage.getItem("token"))
            }

        }
        loadData();

    }, [])

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken

    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;




