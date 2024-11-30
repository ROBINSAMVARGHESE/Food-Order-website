import React, { useContext, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { BiRupee } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount,url } = useContext(StoreContext);

    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const navigate = useNavigate();

    const hasCartItems = Object.values(cartItems).some(quantity => quantity > 0);

    const handlePromoCodeSubmit = () => {
        let discountAmount = 0;

        // Define valid promo codes
        if (promoCode === 'TASTYKART10') {
            discountAmount = getTotalCartAmount() * 0.1; 
        } else if (promoCode === 'WELCOME20') {
            discountAmount = getTotalCartAmount() * 0.2; 
        } else if (promoCode === 'FREESHIP') {
            discountAmount = 2; 
        } else {
            alert('Invalid promo code');
            discountAmount = 0;
        }

        setDiscount(discountAmount);
    };

    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                {hasCartItems && <hr className="cart-divider" />}
                {food_list.map((item) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={item._id} className="cart-items-item">
                                <img src={url+"/images/"+item.image} alt={item.name} />
                                <p>{item.name}</p>
                                <p><BiRupee />{item.price}</p>
                                <p>{cartItems[item._id]}</p>
                                <p><BiRupee />{item.price * cartItems[item._id]}</p>
                                <p
                                    className="cart-remove"
                                    onClick={() => removeFromCart(item._id)}
                                >
                                    X
                                </p>
                            </div>
                        );
                    }
                    return null;
                })}
                {!hasCartItems && (
                    <p className="cart-empty-message">
                        Your cart is empty.
                    </p>
                )}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div className="cart-total-details">
                        <p>Subtotal</p>
                        <p><BiRupee />{getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <p>Delivery Fee</p>
                        <p><BiRupee /> {getTotalCartAmount()===0?0:2}</p>
                    </div>
                    <hr />
                    {/* Display the discount and adjusted total */}
                    {discount > 0 && (
                        <div className="cart-total-details">
                            <p>Discount</p>
                            <p>-<BiRupee />{discount}</p>
                        </div>
                    )}
                    <div className="cart-total-details">
                        <b>Total</b>
                        <b><BiRupee />{getTotalCartAmount()===0?0:getTotalCartAmount() + 2 - discount}</b>
                    </div>
                    <button onClick={() => navigate('/placeorder')}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cart-promocode">
                    <p>If you have a promo code, enter it here</p>
                    <div className="cart-promocode-input">
                        <input
                            type="text"
                            placeholder="Promo Code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <button onClick={handlePromoCodeSubmit}>Submit</button>
                    </div> 
                     
                     <p><strong>Available Promo Codes:</strong></p>
                    <p>TASTYKART10 - Get 10% off your first order.</p>
                    <p>WELCOME20 - Save 20% on orders over ₹50.</p>
                    <p>FREESHIP - Free shipping on orders above ₹30.</p>
                </div>
            </div>
        </div>
    );
};

export default Cart;


