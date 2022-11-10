import React from "react";
import Search from "../Search/Search";
import NavBar from "../Nav/NavBar";
import { Link } from "react-router-dom";
import "../../utils/constant"

import logo from "../../assets/images/demos/demo-4/logo.png"
import { path } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/actions/userActions";

const Header = () => {

    const userselector = useSelector(state => state);
    const dispatch = useDispatch();
    console.log(">>>a", userselector)
    // console.log(">>>",userselector)
    let arrLanguage = [
        { id: '001', name: 'USA', link: 'https://www.reactjs.org' },
        { id: '002', name: 'ENGLAND', link: 'https://www.reactjs.org' },
        { id: '003', name: 'CHINA', link: 'https://www.reactjs.org' },
    ]
    const nav = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('isLoggedIn');
        dispatch(logout());
        console.log(">>>", userselector)
        nav(path.HOME);
    }
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
                                <Search />
                            </div>

                            <div className="header-right">
                                <div className="dropdown cart-dropdown">
                                    <Link to={path.CART} className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                                        <div className="icon">
                                            <i className="icon-shopping-cart"></i>
                                            <span className="cart-count">2</span>
                                        </div>
                                        <p>Giỏ hàng</p>
                                    </Link>
                                </div>
                                <div className="dropdown compare-dropdown">
                                    {(userselector && (!userselector.userLogin.isLoggedIn || userselector.userLogin.isLoggedIn === false)) ? (
                                        <Link to={path.LOGIN} className="dropdown-toggle">
                                            <div className="icon">
                                                <i className="icon-user"></i>
                                            </div>
                                            <p>Tài khoản</p>
                                        </Link>
                                    ) : (
                                        <>
                                            <Link to={path.USERPROFILE} className="dropdown-toggle">
                                                <div className="icon">
                                                    <i className="icon-user"></i>
                                                </div>
                                                {/* <p>Tài khoản</p> */}
                                                <p>
                                                    {(userselector && userselector.userLogin.isLoggedIn === true)
                                                        ? userselector.userLogin.userInfo.username
                                                        : 'Tài khoản'}
                                                </p>
                                            </Link>
                                            <div className="icon" >
                                                <i className="icon-sigin" onClick={handleLogout}>ssssssssssssss</i>
                                            </div>
                                        </>
                                    )}
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