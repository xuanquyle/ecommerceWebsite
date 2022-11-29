import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormText } from 'reactstrap';
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { cancelOrder } from '../../api';
import { notify } from "../../utils/constant"
import { ToastContainer } from 'react-toastify';
import { connect } from "react-redux";

const ModalOrder = (props) => {
    const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm();
    const closeBtn = (
        <button className="btn-sm btn-danger" onClick={props.toggle} type="button">
            &times;
        </button>
    );
    const handleOnSubmit = () => {

    }

    const getStatus = (arr) => {
        if (arr.receivedAt === null)
            return (
                <div className='d-flex align-items-center'>
                    {props.order.canceledAt === null
                        ? (
                            <span className='badge badge-secondary'
                                style={{ fontSize: '1.4rem' }}>Chờ xác nhận</span>
                        ) : (
                            <span className='badge badge-danger'
                                style={{ fontSize: '1.4rem' }}>Đơn đã hủy</span>
                        )

                    }

                    {props.order.canceledAt === null
                        ? (
                            <button className='btn-danger rounded ml-3'
                                onClick={onCancelOrder}>Hủy đơn hàng
                            </button>
                        ) : ''}

                </div>
            )
        if (arr.deliveryStartedAt === null)
            return (
                <span className=' badge badge-warning'
                    style={{ fontSize: '1.4rem' }}>Đang giao hàng</span>
            )
        if (arr.deliveredAt === null)
            return (
                <span className=' badge badge-success'
                    style={{ fontSize: '1.4rem' }}>Đã nhận hàng</span>
            )
    }

    const onCancelOrder = async () => {
        if (window.confirm('Bạn có chắc muốn hủy đơn hàng này ?')) {
            try {
                console.log(props.order._id)
                let res = await cancelOrder(props.user.isLoggedIn, props.user.id, props.order._id)
                // console.log(res);
                notify('success', 'Đã hủy đơn hàng thành công')
                props.toggle();
            } catch (error) {

            }
        }
    }

    return (
        props.order &&
        <div>
            <ToastContainer theme='colored' />
            <Modal isOpen={props.isOpen} toggle={props.toggle}
                size="lg" style={{ maxWidth: '900px', width: '100%' }}>
                <ModalHeader toggle={props.toggle} close={closeBtn}>Chi tiết đơn hàng</ModalHeader>
                <ModalBody className='p-5'>
                    <form onSubmit={handleSubmit(handleOnSubmit)}>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="inputEmail4">Mã đơn hàng</label>
                                <input type="text" className="form-control" id="inputEmail4"
                                    defaultValue={props.order._id}
                                    readOnly />
                            </div>
                            <div className="form-group col-md-8">
                                <label htmlFor="inputPassword4">Email</label>
                                <input type="text" className="form-control" id="inputPassword4" placeholder="Tên sản phẩm..."
                                    defaultValue={props.order.user.email}
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
                                <label >Tên sản phẩm</label>
                            </div>
                            <div className="form-group col-md-2">
                                <label >Màu</label>
                            </div>
                            <div className="form-group col-md-2">
                                <label >Ram</label>
                            </div>
                            <div className="form-group col-md-2">
                                <label >Rom</label>
                            </div>
                            <div className="form-group col-md-2">
                                <label >Số lượng</label>
                            </div>
                        </div>
                        {props.order.orderItems && props.order.orderItems.map((item, index) => {
                            return (
                                item.product.options.map((item2) => {
                                    if (item.option === item2._id)
                                        return (
                                            <div className="form-row" key={item2._id}>
                                                <div className="form-group col-md-4">
                                                    <input type="text" className="form-control" id="inputEmail4"
                                                        defaultValue={item.product.name}
                                                        readOnly />
                                                </div>
                                                <div className="form-group col-md-2">
                                                    <input type="text" className="form-control" id="inputEmail4"
                                                        defaultValue={item2.color}
                                                        readOnly />
                                                </div>
                                                <div className="form-group col-md-2">
                                                    <input type="text" className="form-control" id="inputEmail4"
                                                        defaultValue={item2.ram}
                                                        readOnly />
                                                </div>
                                                <div className="form-group col-md-2">
                                                    <input type="text" className="form-control" id="inputEmail4"
                                                        defaultValue={item2.rom}
                                                        readOnly />
                                                </div>
                                                <div className="form-group col-md-2">
                                                    <input type="text" className="form-control" id="inputEmail4"
                                                        defaultValue={item.qty}
                                                        readOnly />
                                                </div>
                                            </div>
                                        )
                                })
                            )
                        })}
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="inputEmail4">Họ tên</label>
                                <input type="text" className="form-control" id="inputEmail4"
                                    defaultValue={props.order.customerName}
                                    readOnly />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputEmail4">Số điện thoại</label>
                                <input type="text" className="form-control" id="inputEmail4"
                                    defaultValue={props.order.customerPhone}
                                    readOnly />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputEmail4">Ngày đặt</label>
                                <input type="text" className="form-control" id="inputEmail4"
                                    defaultValue={
                                        props.order.status.createdAt !== null
                                            ? (new Date(props.order.status.createdAt)).getDate() + '-' + (Number((new Date(props.order.status.createdAt)).getMonth()) + 1) + '-' + (new Date(props.order.status.createdAt)).getFullYear()
                                            : ''
                                    }
                                    readOnly />
                            </div>

                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-8">
                                <label htmlFor="inputEmail4">Địa chỉ</label>
                                <input type="text" className="form-control" id="inputEmail4"
                                    defaultValue={props.order.shippingAddress}
                                    readOnly />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-3">
                                <label htmlFor="inputEmail4">Ngày đặt</label>
                                <input type="text" className="form-control" id="inputEmail4"
                                    defaultValue={
                                        props.order.status.createdAt !== null
                                            ? (new Date(props.order.status.createdAt)).getDate() + '-' + (Number((new Date(props.order.status.createdAt)).getMonth()) + 1) + '-' + (new Date(props.order.status.createdAt)).getFullYear()
                                            : ''
                                    }
                                    readOnly />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="inputEmail4">Ngày xác nhận</label>
                                <input type="text" className="form-control" id="inputEmail4"
                                    defaultValue={
                                        props.order.status.deliveredAt !== null
                                            ? (new Date(props.order.status.deliveredAt)).getDate() + '-' + (Number((new Date(props.order.status.deliveredAt)).getMonth()) + 1) + '-' + (new Date(props.order.status.deliveredAt)).getFullYear()
                                            : ''}
                                    readOnly />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="inputEmail4">Ngày vận chuyển</label>
                                <input type="text" className="form-control" id="inputEmail4"
                                    defaultValue={
                                        props.order.status.deliveryStartedAt !== null
                                            ? (new Date(props.order.status.deliveryStartedAt)).getDate() + '-' + (Number((new Date(props.order.status.deliveryStartedAt)).getMonth()) + 1) + '-' + (new Date(props.order.status.deliveryStartedAt)).getFullYear()
                                            : ''
                                    }
                                    readOnly />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="inputEmail4">Ngày nhận hàng</label>
                                <input type="text" className="form-control" id="inputEmail4"
                                    defaultValue={
                                        props.order.status.receivedAt !== null
                                            ? (new Date(props.order.status.receivedAt)).getDate() + '-' + (Number((new Date(props.order.status.receivedAt)).getMonth()) + 1) + '-' + (new Date(props.order.status.receivedAt)).getFullYear()
                                            : ''
                                    }
                                    readOnly />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="inputEmail4">Thành tiền</label>
                                <input type="text" className="form-control" id="inputEmail4"
                                    style={{ color: 'red' }}
                                    defaultValue={props.order.totalPrice.toLocaleString('de-DE')}
                                    readOnly />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputAddress">Trạng thái</label>
                                <br />
                                {getStatus(props.order.status)}
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
        </div>
    )
}
const mapStateToProp = state => {
    return {
        user: state.userLogin
    }
}
export default connect(mapStateToProp)(ModalOrder);