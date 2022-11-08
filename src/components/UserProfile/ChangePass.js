import { useForm } from "react-hook-form"

const ChangePass = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log('>>>', data);
    }

    return (
        <div className="col-md-8">
            <div className="card mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className='change-pass' style={{width: '50%', height: '530px'}}>
                            <div className="mt-5"></div>
                            <form >
                                <div className="col-12 form-group login-input">
                                    <label>Mật khẩu hiện tại:</label>
                                    <input type="password" className="form-control" 
                                        {...register("password", {
                                            required: true,
                                            minLength: 6
                                        })}>
                                    </input>
                                </div>
                                <div className="col-12 form-group login-input">
                                    <label>Mật khẩu mới:</label>
                                    <input type="password" className="form-control" 
                                        {...register("password", {
                                            required: true,
                                            minLength: 6
                                        })}>
                                    </input>
                                </div>
                                <div className="col-12 form-group login-input">
                                    <label>Nhập lại mật khẩu mới:</label>
                                    <input type="password" className="form-control" 
                                        {...register("password", {
                                            required: true,
                                            minLength: 6
                                        })}>
                                    </input>
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-primary">Lấy mã xác nhận</button>
                                </div>
                                <div className="col-12">
                                    {/* <Link to={path.LOGIN}><span style={{ fontSize: '16px' }}>Đăng nhập?</span></Link>
                                    <Link to={path.REGISTER}><span style={{ float: 'right', fontSize: '18px', color: 'orange' }}>Đăng ký</span></Link> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePass