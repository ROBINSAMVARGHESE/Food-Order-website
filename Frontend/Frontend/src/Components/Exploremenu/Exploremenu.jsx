import React from 'react'
import './Exploremenu.css'
import { menu_list } from '../../assets/assets'

const Exploremenu = ({ category, setCategory }) => {

    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore our menu</h1>
            <p className='explore-menu-text'>Choose from a diverse menu featuring a detectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time. </p>
            <div className="explore-menu-list">
                {menu_list.map((item, index) => {
                    return (
                        <div className='explore-menu-list-item' onClick={() => setCategory(prev => prev === item.menu_name ? 'all' : item.menu_name)} key={index}>
                            <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt={item.menu_image} />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr />
        </div>
    )
}

export default Exploremenu
