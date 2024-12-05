import React, { useEffect, useState } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const verifyPayment = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("You need to log in to verify your payment.");
            navigate("/login");
            return;
        }

        try {
            const response = await axios.post(
                `${url}/api/order/verify`,
                { success, orderId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            
            if (response.data.success) {
                console.log( "success" , response.data);
                navigate("/myorders");
            } else { 
                console.log( "fail" , response.data);
                
                setError("Payment verification failed. Redirecting to home.");
                
                navigate("/");

                
            }
        } catch (err) {
            setError("An error occurred during payment verification.");
            console.error("Error verifying payment:", err);
            navigate("/");
        }
    };

    useEffect(() => {
        console.log("calling for verfiy");
        
        verifyPayment();
    }, []);

    return (
        <div className="verify">
            <div className="spinner"></div>
        </div>
    );
};

export default Verify;

