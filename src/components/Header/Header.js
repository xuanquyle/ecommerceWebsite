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
import { connect } from "react-redux";

const Header = (props) => {

    const userselector = useSelector(state => state);
    const dispatch = useDispatch();
    console.log(">>>a", userselector)
    // console.log(">>>",userselector)
    const nav = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('id');
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
                                                    {(props.user && props.user.isLoggedIn !== '')
                                                        ? props.user.email
                                                        : 'Tài khoản'}
                                                </p>
                                            </Link>
                                            <Link className="dropdown-toggle ml-3"
                                                style={{ fontFamily: 'aria !important' }}>
                                                <span onClick={handleLogout}
                                                    style={{ fontSize: '1.4rem', }}>
                                                    <i className="icon-signout"></i>
                                                </span>
                                            </Link>
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

const mapStateToProp = state => {
    return {
        user: state.userLogin
    }
}
export default connect(mapStateToProp)(Header);