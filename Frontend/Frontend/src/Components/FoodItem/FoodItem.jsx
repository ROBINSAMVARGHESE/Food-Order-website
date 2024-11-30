import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { BiRupee } from 'react-icons/bi';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image, discount }) => {
    // Access cartItems and add/remove methods from context
    const { cartItems, addToCart, removeFromCart,url } = useContext(StoreContext);

    // Calculate discounted price if discount exists
    const discountedPrice = discount ? (price - (price * (discount / 100))).toFixed(2) : price;

    return (
        <div className="food-item">
            <div className="food-item-img-container">
                <img className="food-item-image" src={url+"/images/"+image} alt={name} />
                {/* Display Add/Remove buttons based on cartItems */}
                {!cartItems[id] ? (
                    <img
                        className="add"
                        onClick={() => addToCart(id)}
                        src={assets.add_icon_white}
                        alt="Add"
                    />
                ) : (
                    <div className="food-item-counter">
                        <img
                            onClick={() => removeFromCart(id)}
                            src={assets.remove_icon_red}
                            alt="Remove"
                        />
                        <p>{cartItems[id]}</p>
                        <img
                            onClick={() => addToCart(id)}
                            src={assets.add_icon_green}
                            alt="Add"
                        />
                    </div>
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="Rating" />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">
                    <BiRupee />
                    {discount ? (
                        <span className="discounted-price">
                            {discountedPrice} 
                        </span>
                    ) : (
                        price 
                    )}
                </p>
                {discount && (
                    <p className="food-item-discount">
                        <span>({discount}% OFF)</span> 
                    </p>
                )}
            </div>
        </div>
    );
};

export default FoodItem;



