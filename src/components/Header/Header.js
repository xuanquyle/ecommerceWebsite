import React from "react";
import Search from "../Search/Search";
import NavBar from "../Nav/NavBar";
import { Link } from "react-router-dom";

import logo from "../../assets/images/demos/demo-4/logo.png"

const Header = () => {

    let arrLanguage = [
        { id: '001', name: 'USA', link: 'https://www.reactjs.org' },
        { id: '002', name: 'ENGLAND', link: 'https://www.reactjs.org' },
        { id: '003', name: 'CHINA', link: 'https://www.reactjs.org' },
    ]

    return (
        <>
            <div className="page-wrapper">
                <header className="header header-intro-clearance header-4" >
                    <div className="header-middle">
                        <div className="container">
                            <div className="header-left">
                                <a href="/" className="logo">
                                    <img src={logo} alt="Molla Logo" width="105" height="25" />
                                </a>
                            </div>

                            <div className="header-center">
                                <Search/>
                            </div>

                            <div className="header-right">
                                <div className="dropdown compare-dropdown">
                                    <a href="/" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static" title="Compare Products" aria-label="Compare Products">
                                        <div className="icon">
                                            <i className="icon-random"></i>
                                        </div>
                                        <p>Compare</p>
                                    </a>                       
                                </div>
                                <div className="dropdown cart-dropdown">
                                    <Link to="/Cart" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                                        <div className="icon">
                                            <i className="icon-shopping-cart"></i>
                                            <span className="cart-count">2</span>
                                        </div>
                                        <p>Cart</p>
                                    </Link> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <NavBar />
                </header>

            </div>
        </>
    );
}

export default Header;