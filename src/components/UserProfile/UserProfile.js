import { Outlet, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import hinh from "../../assets/images/demos/demo-10/bg-1.jpg"
import { path } from "../../utils/constant"
import { Link } from 'react-router-dom'
import { connect, useSelector } from "react-redux";
import { getProfileUser } from '../../api';

const UserProfile = (props) => {
    const userselector = useSelector(state => state);
    const nav = useNavigate();
    const [profile, setProfile] = useState();
    const menu = [
        { id: '1', title: 'Thông tin tài khoản', link: path.USERPROFILE },
        { id: '2', title: 'Địa chỉ', link: path.USERADDRESS },
        { id: '3', title: 'Đơn mua', link: path.USERPURECHASED },
        { id: '4', title: 'Đổi mật khẩu', link: path.USERCHANGEPASS },
        { id: '5', title: 'Đăng xuất', link: path.HOME },
    ]

    const getProfile = async () => {
        try {
            if (props.user && props.user.isLoggedIn !== '') {
                let data = await getProfileUser(props.user.isLoggedIn, props.user.id);
                setProfile(data.data)
                console.log('profile', data.data);
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {    
        getProfile();
    }, [])

    return (
        <>
            {(userselector.userLogin.isLoggedIn !== '' && profile)
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
                                                    <h5>{profile.lastname + ' ' + profile.firstname}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mt-3">
                                        <ul className="list-group list-group-flush">
                                            {menu && menu.map((item, index) => {
                                                return (
                                                    <Link to={item.link} key={item.id} >
                                                        <li className="list-group-item d-flex align-items-center flex-wrap"
                                                            style={{ fontSize: '1.6rem' }}>
                                                            {item.title}
                                                        </li>
                                                    </Link>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <Outlet 
                                context={[profile, getProfile]}/>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                ) : <p>Bạn chưa đăng nhập</p>}
        </>

    )
}

const mapStateToProp = state => {
    return {
        user: state.userLogin
    }
}


export default connect(mapStateToProp)(UserProfile);