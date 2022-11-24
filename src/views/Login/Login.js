
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import { connect, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { path } from "../../ultils/constant";
import { login } from "../../store/actions/userActions"
import { Login as funcLogin } from "../../Api";
import { notify } from '../../ultils/constant';
import { ToastContainer } from 'react-toastify';
// import { connect } from "react-redux";

const Login = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        console.log(data);
        try {
            let res = await funcLogin(data);
            // console.log(res)
            if (res.data.isAdmin === false) {
                notify('error', 'Bạn không có quyền admin !')
            } else {
                // localStorage.setItem('isLoggedIn',JSON.stringify(true));
                // localStorage.setItem('userInfo', JSON.stringify(data));
                // dispatch(login(data));
                // navigate('/');
                console.log('>>>', res.data);
            }
        } catch (error) {

        }

    }

    return (
        <div className='login-background'>
            <ToastContainer
                theme="colored" />
            <div className='login-container' style={{ height: '450px' }}>
                <div className='login-content'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="col-12 login-text">Đăng nhập</div>
                        <div className="col-12 form-group login-input">
                            <label>Tên tài khoản:</label>
                            <input type="text" className="form-control" placeholder="Email..."
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