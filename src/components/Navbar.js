import hinh from "../assets/plugins/images/users/varun.jpg"
import { Link } from "react-router-dom"

import logo from "../assets/images/logo.png"

const Navbar = () => {

    return (
        <div className="topbar" data-navbarbg="skin5">
            <nav className="navbar top-navbar navbar-expand-md navbar-dark">
                <div className="navbar-collapse collapse" id="navbarSupportedContent" data-navbarbg="skin5"
                    style={{ background: '#2f323e' }}>
                    <div className="navbar-header" data-logobg="skin6">
                        <Link className="navbar-brand" style={{ background: '#2f323e' }} to={'/'}>
                            <b className="logo-icon">
                                <img src={logo} alt="homepage" />
                            </b>
                        </Link>
                    </div>
                    <ul className="navbar-nav ms-auto d-flex align-items-center"
                        style={{ marginRight: "20px" }}>
                        <li className=" in">
                            <i className="fa fa-bell" style={{ color: '#fff', marginRight: '15px' }}></i>
                        </li>
                        <li>
                            <Link className="profile-pic" to={'/'}>
                                <img src={hinh} alt="user-img" width="36"
                                    className="img-circle" /><span className="text-white font-medium" >Steave</span></Link>
                        </li>

                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar