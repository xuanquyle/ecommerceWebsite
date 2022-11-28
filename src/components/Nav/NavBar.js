import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { path } from "../../utils/constant"

const NavBar = () => {

    let arrNavItem = [
        { id: '001', name: 'Trang chủ', link: path.HOME },
        { id: '002', name: 'Sản phẩm', link: path.PRODUCT },
        { id: '003', name: 'Liên hệ', link: path.CONTACT },
        { id: '004', name: 'Blog', link: path.TABLET }
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