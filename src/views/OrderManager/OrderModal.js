import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormText } from 'reactstrap';
import React from 'react';
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { getAllCategory, createProduct } from '../../Api';
import { ToastContainer } from 'react-toastify';
import { notify } from '../../ultils/constant';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';

const ModalOrder = (props) => {

    const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm();
    const closeBtn = (
        <button className="btn-sm btn-danger" onClick={props.toggle} type="button">
            &times;
        </button>
    );
    // STATE
    const [arrCate, setArrCate] = useState();
    const [isOpenImage, setIsOpenImage] = useState(false)
    // 
    // var curNumOptions = props.product.options ? Object.keys(props.product.options).length : '0';


    props.toggle();
    const onSubmit = () => {

    }
    return (
        props.order &&
        <>
            <div>
                <Modal isOpen={props.isOpen} toggle={props.toggle}
                    className={'container'}
                    size={'xl'} >

                    <ModalHeader toggle={props.toggle} close={closeBtn}>
                        Thêm sản phẩm
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputEmail4">Mã đơn hàng</label>
                                    <input type="text" className="form-control" id="inputEmail4"
                                        defaultValue={props.order.id}
                                        readOnly />
                                </div>
                                <div className="form-group col-md-8">
                                    <label htmlFor="inputPassword4">Email</label>
                                    <input type="text" className="form-control" id="inputPassword4" placeholder="Tên sản phẩm..."
                                        defaultValue={props.order.email}
                                    // {...register("email", {
                                    //     // required: true,
                                    //     // minLength: 6
                                    // })} 
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputEmail4">Tên sản phẩm</label>
                                    <input type="text" className="form-control" id="inputEmail4"
                                        defaultValue={'Xiaomi 12T'}
                                        readOnly />
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputEmail4">Màu</label>
                                    <input type="text" className="form-control" id="inputEmail4"
                                        defaultValue={'đen'}
                                        readOnly />
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputEmail4">Ram</label>
                                    <input type="text" className="form-control" id="inputEmail4"
                                        defaultValue={'8GB'}
                                        readOnly />
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputEmail4">Rom</label>
                                    <input type="text" className="form-control" id="inputEmail4"
                                        defaultValue={'256GB'}
                                        readOnly />
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputEmail4">Số lượng</label>
                                    <input type="text" className="form-control" id="inputEmail4"
                                        defaultValue={'1'}
                                        readOnly />
                                </div>

                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputEmail4">Họ tên</label>
                                    <input type="text" className="form-control" id="inputEmail4"
                                        defaultValue={props.order.name}
                                        readOnly />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputEmail4">Thành tiền</label>
                                    <input type="text" className="form-control" id="inputEmail4"
                                        defaultValue={props.order.price}
                                        readOnly />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputEmail4">Ngày đặt</label>
                                    <input type="text" className="form-control" id="inputEmail4"
                                        defaultValue={props.order.date}
                                        readOnly />
                                </div>

                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-8">
                                    <label htmlFor="inputEmail4">Địa chỉ</label>
                                    <input type="text" className="form-control" id="inputEmail4"
                                        defaultValue={'127 d5, Phường 25, quận Bình Thạnh, tp. Hồ Chí Minh'}
                                        readOnly />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputAddress">Trạng thái</label>
                                    <select className="form-control" id="inputAddress"
                                        // defaultValue={}
                                        {...register("category", {
                                            // required: true,
                                        })}>
                                        {/* {arrCate && arrCate.map((item, index) => {
                                            return (
                                                <option value={item._id} key={item._id}>{item.name}</option>
                                            )
                                        })} */}
                                        <option >Chờ xác nhận</option>
                                        <option >Đã xác nhận</option>
                                        <option >Đang giao hàng</option>
                                        <option >Đã nhận hàng</option>
                                        <option >Hủy đơn</option>
                                    </select>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary">Thêm</button>
                            <button className="btn btn-warning ml-5"
                            // onClick={onResetFrom}
                            >
                                <i className="fas fa-sync" style={{ fontWeight: '600' }}></i>
                            </button>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={props.toggle}>
                            Hủy
                        </Button>
                    </ModalFooter>
                </Modal>

            </div>
        </>
    )
}

export default ModalOrder