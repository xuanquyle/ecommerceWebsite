import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { connect, useSelector } from "react-redux";
import { useOutletContext } from 'react-router-dom';
import { updateProfile } from '../../api';
import { notify } from '../../utils/constant';
import { ToastContainer } from 'react-toastify';


const Profile = (props) => {
    const userselector = useSelector(state => state);
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();
    const [isEdit, setIsEdit] = useState(false);
    const [profile, getProfile] = useOutletContext()

    const onEdit = () => {
        setIsEdit(!isEdit)
    }
    const onCancel = () => {
        setIsEdit(!isEdit)
        // reset();
    }
    const onSubmit = async (data) => {
        // console.log('data submit profile', data)
        try {
            const rep = await updateProfile(props.user.isLoggedIn, props.user.id, data);
            getProfile();
            setIsEdit(false)
            notify('info', 'Cập nhập thông tin thành công')
        } catch (error) {

        }
    }

    return (
        profile &&
        <>
            <ToastContainer
                theme='colored' />
            <div className="col-md-8">
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="row">
                            <form onSubmit={handleSubmit(onSubmit)}
                                style={{ display: 'flex', width: '100%' }}>
                                <aside className="col-lg-6">

                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputEmail4">Email</label>
                                        <input type="Email" className="form-control" id="inputEmail4"
                                            value={profile.email}
                                            disabled
                                            {...register("email", {
                                                value: profile.email
                                                // required: true,
                                            })} />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputPassword4">Tên</label>
                                        <input type="text" className="form-control" id="inputPassword4" placeholder="..."
                                            disabled={isEdit ? '' : 'disabled'}
                                            {...register("firstname", {
                                                value: profile.firstname
                                                // required: true,
                                            })} />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputPassword4">Họ</label>
                                        <input type="text" className="form-control" id="inputPassword4" placeholder="..."
                                            disabled={isEdit ? '' : 'disabled'}
                                            {...register("lastname", {
                                                value: profile.lastname
                                                // required: true,
                                            })} />
                                    </div>
                                </aside>
                                <aside className="col-lg-6">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputPassword4">Số điện thoại</label>
                                        <input type="text" className="form-control" id="inputPassword4" placeholder="..."
                                            disabled={isEdit ? '' : 'disabled'}
                                            {...register("phone", {
                                                value: profile.phone
                                                // required: true,
                                            })} />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputPassword4">Giới tính</label>
                                        <select className="form-control" id="inputAddress"
                                            disabled={isEdit ? '' : 'disabled'}
                                            {...register("sex", {
                                                // required: true,
                                                value: profile.sex
                                            })}>
                                            <option value="nam">nam</option>
                                            <option value="nữ">nữ</option>
                                            <option value="khác">khác</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputPassword4">Ngày sinh</label>
                                        <input type="date" className="form-control" id="inputPassword4" placeholder="..."
                                            max="2010-01-01"
                                            // defaultValue={profile.birth}
                                            disabled={isEdit ? '' : 'disabled'}
                                            {...register("birth", {
                                                value: (new Date(profile.birth)).toISOString().substring(0,10)
                                                // required: true,
                                            })} />
                                    </div>
                                    <div className='d-flex flex-row-reverse'>
                                        {isEdit
                                            ? (
                                                <>
                                                    <button className='btn btn-danger rounded ml-3'
                                                        type='button'
                                                        onClick={onCancel}>Hủy</button>
                                                    <button className='btn btn-info rounded'
                                                        type='submit'
                                                    >Lưu</button>
                                                </>
                                            )
                                            : (<button className='btn btn-info rounded'
                                                type='button'
                                                onClick={onEdit}>Sửa</button>)}
                                    </div>
                                </aside>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProp = state => {
    return {
        user: state.userLogin
    }
}


export default connect(mapStateToProp)(Profile);
