import { Outlet, useNavigate } from "react-router-dom"
import hinh from "../../assets/images/demos/demo-10/bg-1.jpg"
import { path } from "../../utils/constant"
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"

const UserProfile = () => {
    const userselector = useSelector(state => state);
    const nav = useNavigate();
    const menu = [
        { id: '1', title: 'Thông tin tài khoản', link: path.USERPROFILE },
        { id: '2', title: 'Địa chỉ', link: path.USERADDRESS },
        { id: '3', title: 'Đơn mua', link: path.USERPURECHASED },
        { id: '4', title: 'Đổi mật khẩu', link: path.USERCHANGEPASS },
        { id: '5', title: 'Đăng xuất', link: path.HOME },
    ]

    return (
        <>
            {(userselector.userLogin.isLoggedIn === true) 
            ? (
                <div className="user-main" style={{ backgroundColor: '#e2e8f0' }}>
                    {/* <div className="container" > */}
                    <div className="main-body">
                        <div className="row gutters-sm">
                            <div className="col-md-2 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle mt-5" width="150" />
                                            <div className="mt-3">
                                                <h4>John Doe</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mt-3">
                                    <ul className="list-group list-group-flush">
                                        {menu && menu.map((item, index) => {
                                            return (
                                                <li key={item.id} className="list-group-item d-flex align-items-center flex-wrap"
                                                    style={{ fontSize: '1.6rem' }}>
                                                    <Link to={item.link}>{item.title}</Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <Outlet />
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            ) : <p>Bạn chưa đăng nhập</p>}
        </>

    )
}

export default UserProfile