
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import { connect, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import "../../utils/constant"
import { path } from "../../utils/constant";
import { login } from "../../store/actions/userActions"
import logo from "../../assets/images/demos/demo-4/logo.png"
import { Login as apiLogin } from "../../api";
import { notify } from '../../utils/constant';
import { ToastContainer } from 'react-toastify';
// import { connect } from "react-redux";

const Login = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        console.log('data', data)
        try {
            const rep = await apiLogin(data);
            // console.log('data', rep)
            localStorage.setItem('isLoggedIn', JSON.stringify(rep.data.accessToken));
            localStorage.setItem('email', JSON.stringify(rep.data.email));
            localStorage.setItem('id', JSON.stringify(rep.data._id));
            const saveInfo = { 'isLoggedIn': rep.data.accessToken, 'email': rep.data.email, 'id': rep.data._id }
            dispatch(login(saveInfo));
            navigate('/');
        } catch (error) {
            notify('error', 'Tên tài khoản hoặc mật khẩu không chính xác !')
        }

        // console.log('>>>',data);
    }

    return (
        <div className='login-background'>
            <ToastContainer
                theme="colored" />
            <div className='login-container' style={{ height: '450px' }}>
                <div className="d-flex mt-3 justify-content-center">
                    <img src={logo} placeholder="Logo" />
                </div>
                <div className='login-content'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* <div className="col-12 login-text">Đăng nhập</div> */}
                        <div className="col-12 form-group login-input">
                            <label>Tên tài khoản:</label>
                            <input type="email" className="form-control" placeholder="Email..."
                                {...register("email", {
                                    required: true,
                                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                                })}>
                            </input>
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Mật khẩu:</label>
                            <input type="password" className="form-control" placeholder="Password..."
                                {...register("password", {
                                    required: true,
                                    minLength: 6
                                })}>
                            </input>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-login" type="submit">Đăng nhập</button>
                        </div>
                        <div className="col-12">
                            <Link to={path.FORGOTPASSWORD}><span style={{ fontSize: '14px' }}>Quên mật khẩu?</span></Link>
                            <Link to={path.REGISTER}><span style={{ float: 'right', fontSize: '18px', color: 'orange' }}>Đăng ký</span></Link>
                        </div>
                    </form>
                    <div style={{ marginTop: '15px' }}>
                        {/*{Object.keys(errors).length !== 0 && (<p style={{color: 'red'}}>Tài khoản hoặc mật khẩu không chính xác</p>)} */}
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProp = state => {
    return {
        user: state.userLoginReducer
    }
}


export default connect(mapStateToProp)(Login);