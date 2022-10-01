import { useState, useEffect } from "react";

const NavBar = () => {

    let arrNavItem = [
        { id: '001', name: 'Home', link: 'https://www.reactjs.org' },
        { id: '002', name: 'Laptop', link: 'https://www.reactjs.org' },
        { id: '003', name: 'Smart Phone', link: 'https://www.reactjs.org' },
        { id: '004', name: 'Accessory', link: 'https://www.reactjs.org' }
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
                                        index === 0
                                            ? (<li className="megamenu-container active" key={item.id}>
                                                <a href={item.link} className="sf-with-ul">{item.name}</a>
                                            </li>)
                                            : (<li className="megamenu-container" key={item.id}>
                                                <a href={item.link} className="sf-with-ul">{item.name}</a>
                                            </li>)
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