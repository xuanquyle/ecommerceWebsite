import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormText } from 'reactstrap';
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { notify } from "../../ultils/constant"
import { ToastContainer } from 'react-toastify';
import { connect } from "react-redux";

const ModalUser = (props) => {
    const { register, handleSubmit, reset, keepValues, control, formState: { errors } } = useForm();
    const closeBtn = (
        <button className="btn-sm btn-danger" onClick={props.toggle} type="button">
            &times;
        </button>
    );

    return (
        props.user &&
        <div>
            <ToastContainer theme='colored' />
            <Modal isOpen={props.isOpen} toggle={props.toggle}
                size="lg" style={{ maxWidth: '900px', width: '100%' }}>
                <ModalHeader toggle={props.toggle} close={closeBtn}>Chi tiết đơn hàng</ModalHeader>
                <ModalBody className='p-5'>
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="inputEmail4">Mã khách hàng</label>
                                <input type="text" className="form-control" id="inputEmail4"
                                    defaultValue={props.user._id}
                                    readOnly />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputPassword4">Email</label>
                                <input type="text" className="form-control" id="inputPassword4" placeholder=""
                                    defaultValue={props.user.email}
                                    readOnly
                                // {...register("email", {
                                //     // required: true,
                                //     // minLength: 6
                                // })} 
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputPassword4">Số điện thoại</label>
                                <input type="text" className="form-control" id="inputPassword4" placeholder=""
                                    defaultValue={props.user.phone}
                                    readOnly
                                // {...register("email", {
                                //     // required: true,
                                //     // minLength: 6
                                // })} 
                                />
                            </div>

                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="inputEmail4">Họ</label>
                                <input type="text" className="form-control" id="inputEmail4"
                                    defaultValue={props.user.firstname}
                                    readOnly />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputPassword4">Tên</label>
                                <input type="text" className="form-control" id="inputPassword4" placeholder=""
                                    defaultValue={props.user.lastname}
                                    readOnly
                                // {...register("email", {
                                //     // required: true,
                                //     // minLength: 6
                                // })} 
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputPassword4">Giới tính</label>
                                <input type="text" className="form-control" id="inputPassword4" placeholder=""
                                    defaultValue={props.user.sex}
                                    readOnly
                                // {...register("email", {
                                //     // required: true,
                                //     // minLength: 6
                                // })} 
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <select className="form-control" id="inputAddress"
                                    defaultValue={props.user.addresses && props.user.addresses[0] ? props.user.addresses[0].id : ''}
                                    {...register("address", {
                                        // required: true,
                                    })}>
                                    {props.user.addresses && props.user.addresses.map((item, index) => {
                                        return (
                                            <option value={item._id} key={item._id}>{item.address}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="inputEmail4">Ngày tạo</label>
                                <input type="text" className="form-control" id="inputEmail4"
                                    defaultValue={props.user.createdAt}
                                    readOnly />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputPassword4">Ngày cập nhập</label>
                                <input type="text" className="form-control" id="inputPassword4" placeholder=""
                                    defaultValue={props.user.updatedAt}
                                    readOnly
                                // {...register("email", {
                                //     // required: true,
                                //     // minLength: 6
                                // })} 
                                />
                            </div>
                        </div>
                    </form>
                    {/* </div> */}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={props.toggle}>
                        Hủy
                    </Button>
                </ModalFooter>
            </Modal>
        </div >
    )
}
// const mapStateToProp = state => {
//     return {
//         user: state.userLogin
//     }
// }
// export default connect(mapStateToProp)(ModalUser);
export default ModalUser