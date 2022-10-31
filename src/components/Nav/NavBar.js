import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {

    let arrNavItem = [
        { id: '001', name: 'Home', link: '/' },
        { id: '002', name: 'Laptop', link: '/Laptop' },
        { id: '003', name: 'Smart Phone', link: '/SmartPhone' },
        { id: '004', name: 'Accessory', link: '/Accessory' }
    ]

    return (
        <>
            <div className="header-bottom sticky-header">
                <div className="container">
                    <div className="header-center">
                        <nav className="main-nav">
                            <ul className="menu">
                                {arrNavItem.map((item, index) => {
                                    return (
                                        <li className="megamenu-container" key={item.id} >
                                            <NavLink end to={item.link} className="sf-with-ul">{item.name}</NavLink>
                                        </li>
                                    )
                                })}
                                {/* <li className="megamenu-container">
                                    <NavLink end to="/" className="sf-with-ul">Home</NavLink>
                                </li>
                                <li className="megamenu-container">
                                    <NavLink to="/aaa" className="sf-with-ul">ffff</NavLink>
                                </li> */}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NavBar;