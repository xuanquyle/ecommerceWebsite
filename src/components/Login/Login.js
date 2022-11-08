
import { useState } from "react";
import {useForm} from "react-hook-form"
import {Link} from "react-router-dom"
import "../../utils/constant"
import { path } from "../../utils/constant";

const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = (data) => {
        console.log('>>>',data);
    }
    return (
        <div className='login-background'>
            <div className='login-container' style={{height: '450px'}}>
                <div className='login-content'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="col-12 login-text">Đăng nhập</div>
                        <div className="col-12 form-group login-input">
                            <label>Tên tài khoản:</label>
                            <input type="text" className="form-control" placeholder="Email..."
                            {...register("username",{
                                required: true,
                                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                            })}>
                            </input>
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Mật khẩu:</label> 
                            <input type="password" className="form-control" placeholder="Password..."
                            {...register("password",{
                                required: true,
                                minLength: 6
                            })}>
                            </input>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-login">Đăng nhập</button>
                        </div>
                        <div className="col-12">
                            <Link to={path.FORGOTPASSWORD}><span style={{fontSize: '14px'}}>Quên mật khẩu?</span></Link>
                            <Link to={path.REGISTER}><span style={{float: 'right', fontSize: '18px', color: 'orange'}}>Đăng ký</span></Link>
                        </div>
                    </form>
                    <div style={{marginTop: '15px'}}>
                        {/*{Object.keys(errors).length !== 0 && (<p style={{color: 'red'}}>Tài khoản hoặc mật khẩu không chính xác</p>)} */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;