import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';

const Profile = () => {
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();
    const onSubmit = (data) => {
    }
    return (
        <>
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
                                            disabled />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputPassword4">Số điện thoại</label>
                                        <input type="text" className="form-control" id="inputPassword4" placeholder="..."
                                            {...register("name", {
                                                required: true,
                                            })} />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputPassword4">Họ tên</label>
                                        <input type="text" className="form-control" id="inputPassword4" placeholder="..."
                                            {...register("name", {
                                                required: true,
                                            })} />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputPassword4">Giới tính</label>
                                        <input type="text" className="form-control" id="inputPassword4" placeholder="..."
                                            {...register("name", {
                                                required: true,
                                            })} />
                                    </div>
                                </aside>
                                <aside className="col-lg-6">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputPassword4">Ngày tham gia</label>
                                        <input type="text" className="form-control" id="inputPassword4" placeholder="..."
                                            {...register("name", {
                                                required: true,
                                            })} />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputPassword4">Tổng tiền đã mua</label>
                                        <input type="text" className="form-control" id="inputPassword4" placeholder="..."
                                            {...register("name", {
                                                required: true,
                                            })} />
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

export default Profile