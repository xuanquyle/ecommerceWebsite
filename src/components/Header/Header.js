import React from "react";

import Search from "../Search/Search";
import NavBar from "../Nav/NavBar";

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
                    <div className="header-top">
                        <div className="container">
                            <div className="header-left">
                                <a href="https://www.reactjs.org"><i className="icon-phone"></i>Call: +0123 456 789</a>
                            </div>
                            <div className="header-right">
                                <ul className="top-menu">
                                    <li>
                                        <a href="https://www.reactjs.org">Links</a>
                                        <ul>
                                            <li>
                                                <div className="header-dropdown">
                                                    <a href="https://www.reactjs.org">USD</a>
                                                    <div className="header-menu">
                                                        <ul>
                                                            <li><a href="https://www.reactjs.org">Eur</a></li>
                                                            <li><a href="https://www.reactjs.org">Usd</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="header-dropdown">
                                                    <a href="https://www.reactjs.org">English</a>
                                                    <div className="header-menu">
                                                        <ul>
                                                            {arrLanguage.map((item, index) => {
                                                                return (
                                                                    <li key={item.id}><a href={item.link}>{item.name}</a></li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                            <li><a href="#signin-modal" data-toggle="modal">Sign in / Sign up</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="header-middle">
                        <div className="container">
                            <div className="header-left">
                                <button className="mobile-menu-toggler">
                                    <span className="sr-only">Toggle mobile menu</span>
                                    <i className="icon-bars"></i>
                                </button>

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

                                    <div className="dropdown-menu dropdown-menu-right">
                                        <ul className="compare-products">
                                            <li className="compare-product">
                                                <a href="/" className="btn-remove" title="Remove Product"><i className="icon-close"></i></a>
                                                <h4 className="compare-product-title"><a href="/">Blue Night Dress</a></h4>
                                            </li>
                                            <li className="compare-product">
                                                <a href="/" className="btn-remove" title="Remove Product"><i className="icon-close"></i></a>
                                                <h4 className="compare-product-title"><a href="/">White Long Skirt</a></h4>
                                            </li>
                                        </ul>

                                        <div className="compare-actions">
                                            <a href="/" className="action-link">Clear All</a>
                                            <a href="/" className="btn btn-outline-primary-2"><span>Compare</span><i className="icon-long-arrow-right"></i></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="dropdown cart-dropdown">
                                    <a href="/" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                                        <div className="icon">
                                            <i className="icon-shopping-cart"></i>
                                            <span className="cart-count">2</span>
                                        </div>
                                        <p>Cart</p>
                                    </a>

                                    <div className="dropdown-menu dropdown-menu-right">
                                        <div className="dropdown-cart-products">
                                            <div className="product">
                                                <div className="product-cart-details">
                                                    <h4 className="product-title">
                                                        <a href="/">Beige knitted elastic runner shoes</a>
                                                    </h4>

                                                    <span className="cart-product-info">
                                                        <span className="cart-product-qty">1</span>
                                                        x $84.00
                                                    </span>
                                                </div>

                                                <figure className="product-image-container">
                                                    <a href="/" className="product-image">
                                                        {/* <img src="assets/images/products/cart/product-1.jpg" alt="product"> */}
                                                    </a>
                                                </figure>
                                                <a href="/" className="btn-remove" title="Remove Product"><i className="icon-close"></i></a>
                                            </div>

                                            <div className="product">
                                                <div className="product-cart-details">
                                                    <h4 className="product-title">
                                                        <a href="/">Blue utility pinafore denim dress</a>
                                                    </h4>

                                                    <span className="cart-product-info">
                                                        <span className="cart-product-qty">1</span>
                                                        x $76.00
                                                    </span>
                                                </div>

                                                <figure className="product-image-container">
                                                    <a href="/" className="product-image">
                                                        {/* <img src="assets/images/products/cart/product-2.jpg" alt="product"> */}
                                                    </a>
                                                </figure>
                                                <a href="/" className="btn-remove" title="Remove Product"><i className="icon-close"></i></a>
                                            </div>
                                        </div>

                                        <div className="dropdown-cart-total">
                                            <span>Total</span>

                                            <span className="cart-total-price">$160.00</span>
                                        </div>

                                        <div className="dropdown-cart-action">
                                            <a href="/" className="btn btn-primary">View Cart</a>
                                            <a href="/" className="btn btn-outline-primary-2"><span>Checkout</span><i className="icon-long-arrow-right"></i></a>
                                        </div>
                                    </div>
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