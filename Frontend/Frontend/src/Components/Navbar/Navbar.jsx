import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const url = import.meta.env.VITE_URL;

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const { getTotalCartAmount, token, setToken, userDetails, setUserDetails, updateAvatar } = useContext(StoreContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: userDetails?.name || "",
        email: userDetails?.email || "",
        avatar: userDetails?.avatar || "",
    });
    const [preview, setPreview] = useState(userDetails?.avatar || "");
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (userDetails) {
            setForm({
                name: userDetails.name,
                email: userDetails.email,
                avatar: userDetails.avatar,
            });
            setPreview(userDetails.avatar);
        }
    }, [userDetails]);

    // Logout functionality
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    // Handle input changes for the profile form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // Handle avatar preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // Profile update functionality
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        if (!userDetails) {
            console.error("User details are not available");
            alert("User details are not available");
            return;
        }

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("email", form.email);
        if (form.password) formData.append("password", form.password);
        if (selectedImage) formData.append("avatar", selectedImage);

        try {
            console.log("Updating profile with data:", {
                name: form.name,
                email: form.email,
                password: form.password,
                avatar: selectedImage,
            });
            const response = await axios.put(`${url}/api/user/profile/${userDetails._id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Response from server:", response.data);
            if (response.data.success) {
                setUserDetails(response.data.user);
                updateAvatar(response.data.user.avatar);
                alert("Profile updated successfully!");
                setShowProfileDropdown(false);
            } else {
                alert("Failed to update profile. Please try again.");
            }
        } catch (error) {
            console.error("Error updating profile:", error.response ? error.response.data : error.message);
            alert("An error occurred while updating the profile.");
        }
    };

    return (
        <div className="navbar">
            <Link to="/">
                <h1 className="navbar-title">Tasty Kart</h1>
            </Link>
            <ul className="navbar-menu">
                <Link
                    to="/"
                    className={menu === "home" ? "active" : ""}
                    onClick={() => setMenu("home")}
                >
                    Home
                </Link>
                <a
                    href="#explore-menu"
                    className={menu === "menu" ? "active" : ""}
                    onClick={() => setMenu("menu")}
                >
                    Menu
                </a>
                <a
                    href="#footer"
                    className={menu === "contact" ? "active" : ""}
                    onClick={() => setMenu("contact")}
                >
                    Contact Us
                </a>
            </ul>
            <div className="navbar-right">
                <Link to="/cart">
                    <img src={assets.basket_icon} alt="Shopping Cart" className="icon" />
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </Link>
                {!token ? (
                    <button onClick={() => setShowLogin(true)}>Sign In</button>
                ) : (
                    <div className="navbar-profile">
                        <img
                            src={preview || assets.profile_icon}
                            alt="Profile"
                            className="icon"
                            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                        />
                        {showProfileDropdown && (
                            <div className="profile-dropdown">
                                <div className="profile-section">
                                    <form onSubmit={handleProfileUpdate}>
                                        <div className="profile-picture">
                                            <label>Profile Picture</label>
                                            <img src={preview || "default-avatar.png"} alt="Profile Preview" />
                                            <input type="file" accept="image/*" onChange={handleImageChange} />
                                        </div>
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="password"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <button type="submit" className="btn-submit">
                                            Update Profile
                                        </button>
                                    </form>
                                </div>
                                <hr />
                                <ul className="dropdown-menu">
                                    <li onClick={() => navigate("/myorders")}>
                                        <img src={assets.bag_icon} alt="Orders" />
                                        <p>Orders</p>
                                    </li>
                                    <li onClick={logout}>
                                        <img src={assets.logout_icon} alt="Logout" />
                                        <p>Logout</p>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;