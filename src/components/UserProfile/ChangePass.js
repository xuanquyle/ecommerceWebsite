import { useForm } from "react-hook-form"
import { changePassword } from "../../api"
import { ToastContainer } from 'react-toastify';
import { connect } from "react-redux";
import { notify } from "../../utils/constant";

const ChangePass = (props) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        // console.log('>>>', data);
        try {
            let res = await changePassword(props.user.isLoggedIn, props.user.id, data)
            reset()
            notify('success', 'Thay đổi mật khẩu thành công !')
        } catch (error) {
            // console.log(error)
            notify('error', error.response.data.message)
        }

    }

    return (
        <div className="col-md-8">
            <ToastContainer theme="colored" />
            <div className="card mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className='change-pass' style={{ width: '50%', height: '530px' }}>
                            <div className="mt-5"></div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="col-12 form-group login-input">
                                    <label>Mật khẩu hiện tại:</label>
                                    <input type="password" className="form-control"
                                        {...register("oldPassword", {
                                            required: true,
                                            minLength: 6
                                        })}>
                                    </input>
                                </div>
                                <div className="col-12 form-group login-input">
                                    <label>Mật khẩu mới:</label>
                                    <input type="password" className="form-control"
                                        {...register("newPassword", {
                                            required: true,
                                            minLength: 6
                                        })}>
                                    </input>
                                </div>
                                <div className="col-12 form-group login-input">
                                    <label>Nhập lại mật khẩu mới:</label>
                                    <input type="password" className="form-control"
                                        {...register("reNewPassword", {
                                            required: true,
                                            minLength: 6
                                        })}>
                                    </input>
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-primary">Đổi mật khẩu</button>
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

const mapStateToProp = state => {
    return {
        user: state.userLogin
    }
}
export default connect(mapStateToProp)(ChangePass);
