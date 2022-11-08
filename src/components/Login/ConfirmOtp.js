
import { useState } from "react";
import {useForm} from "react-hook-form"
import {Link} from "react-router-dom"
import "../../utils/constant"
import { path } from "../../utils/constant";

const ConfirmOtp = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = (data) => {
        console.log('>>>',data);
    }
    return (
        <div className='login-background'>
            <div className='login-container' style={{height: '300px'}}>
                <div className='login-content'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="col-12 login-text">Xác nhận mã OTP</div>
                        <div className="col-12 form-group login-input">
                            <label>Mã OTP:</label>
                            <input type="text" className="form-control" placeholder="OTP..."
                            {...register("username",{
                                required: true,
                                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                            })}>
                            </input>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-login">Xác nhận mã</button>
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

export default ConfirmOtp;