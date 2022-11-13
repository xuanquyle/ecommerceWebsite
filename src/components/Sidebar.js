import { Link } from "react-router-dom"
import { useState } from "react"
import { path } from "../ultils/constant"

const Sidebar = () => {

    const menu = [
        { id: '1', title: 'Trang chủ', icon: 'fa far fa-home', link: path.HOME},
        { id: '2', title: 'Sản phẩm', icon: 'fa fa-laptop', link: path.PRODUCTMANAGER },
        { id: '3', title: 'Đơn hàng', icon: 'fa fa-cart-plus', link: path.ORDER },
        { id: '4', title: 'Tài khoản', icon: 'fa fa-user', link: path.USERMANAGER },
        { id: '5', title: 'Đăng xuất', icon: 'fa fa-sign-out-alt', link: path.HOME },
    ]

    const [isActive, setIsActive] = useState('1');
    const handleOnCkickMemnu = (e) => {
        console.log(e.id);
        setIsActive(e.id)
    }
    return (
        <div className="scroll-sidebar">
            <nav className="sidebar-nav d-flex flex-column flex-shrink-0 ">
                <ul className="nav nav-pills flex-column mb-auto">
                    {menu && menu.map((item, index) => {
                        return (
                            <Link to={item.link} key={item.id}>
                            <li className={isActive === item.id ? 'sidebar-item active' :'sidebar-item'}>
                                <div className={isActive === item.id ? 'sidebar-link waves-effect waves-dark active' : 'sidebar-link waves-effect waves-dark'}
                                    onClick={() => handleOnCkickMemnu(item)}>
                                    <i className={item.icon} aria-hidden="true"></i>
                                    <span className="hide-menu">{item.title}</span>
                                </div>
                            </li>
                            </Link>
                        )
                    })}
                </ul>

            </nav>
        </div>
    )
}

export default Sidebar