import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {

    let arrNavItem = [
        { id: '001', name: 'Trang chủ', link: '/' },
        { id: '002', name: 'Laptop', link: '/Laptop' },
        { id: '003', name: 'Điện thoại', link: '/SmartPhone' },
        { id: '004', name: 'Phụ kiện', link: '/Accessory' }
    ]

    // Sticky Navigation Bar
    const [fix, setFix] = useState(false)
    const setFixed = () => {
        setFix((window.scrollY > 80) ? true : false)
    }
    window.addEventListener("scroll", setFixed)
    return (
        <>
            <div className={fix ? 'header-bottom sticky-header fixed' : 'header-bottom sticky-header'}>
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
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NavBar;