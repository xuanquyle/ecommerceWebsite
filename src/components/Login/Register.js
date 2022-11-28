
import { useState } from "react";
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import "../../utils/constant"
import { path } from "../../utils/constant";
import logo from "../../assets/images/demos/demo-4/logo.png"
import { Register as funcRegister } from "../../api";
import { notify } from '../../utils/constant';
import { ToastContainer } from 'react-toastify';

const Register = () => {
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        console.log('>>>', data);
        try {
            let res = await funcRegister(data);
            console.log(res);
            reset();
            notify('success', res.data)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='login-background'>
            <ToastContainer theme="colored" />
            <div className='login-container' style={{ height: '550px' }}>
                <div className="d-flex mt-3 justify-content-center">
                    <img src={logo} placeholder="Logo" />
                </div>
                <div className='login-content'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* <div className="col-12 login-text">Đăng ký</div> */}
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
                        <div className="col-12 form-group login-input">
                            <label>Nhập lại mật khẩu:</label>
                            <input type="password" className="form-control" placeholder="Comfirm password..."
                                {...register("password", {
                                    required: true,
                                    minLength: 6
                                })}>
                            </input>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-login">Đăng ký</button>
                        </div>
                        <div className="col-12">
                            <Link to={path.LOGIN}><span style={{ float: 'right', fontSize: '18px', color: 'orange' }}>Đăng nhập</span></Link>
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

export default Register;