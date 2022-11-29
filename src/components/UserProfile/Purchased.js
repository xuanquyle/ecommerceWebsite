import { useState, useEffect } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { notify } from "../../utils/constant"
import { ToastContainer } from 'react-toastify';
import { connect, useSelector } from "react-redux";
import { getUserOrder } from '../../api';
import ModalOrder from './ModalOrder';


const Purchased = (props) => {
    const [userOrder, setUserOrder] = useState()
    const [userSelected, setUserSelected] = useState();
    const [status, setCStatus] = useState()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const onClickRead = (item) => {
        // console.log(item);
        setUserSelected(item)
        setIsOpenModal(true)
    }

    const fetchDateOrderUser = async () => {
        try {
            let res = await getUserOrder(props.user.isLoggedIn, props.user.id)
            console.log(res);
            setUserOrder(res.data);
        } catch (error) {

        }
    }

    const getStatus = (arr, canceledAt) => {
        if (canceledAt !== null) {
            return (
                <span className='badge badge-danger'>Đã hủy đơn</span>
            )
        }
        if (arr.receivedAt === null)
            return (
                <span className=' badge badge-secondary'>Chờ xác nhận</span>
            )
        if (arr.deliveryStartedAt === null)
            return (
                <span className=' badge badge-primary'>Đã xác nhận</span>
            )
        if (arr.deliveredAt === null)
            return (
                <span className='badge badge-warning'>Đang giao hàng</span>
            )
            return (
                <span className='badge badge-success'>Đã nhận hàng</span>
            )
    }
    useEffect(() => {
        fetchDateOrderUser();
    }, [])

    const toggle = () => {
        setIsOpenModal(!isOpenModal);
    }
    return (
        <div className="col-md-8">
            <ToastContainer theme='colored' />
            <ModalOrder
                isOpen={isOpenModal}
                toggle={toggle}
                order={userSelected}
                reloadData={fetchDateOrderUser}
            />
            <div className="card mb-3">
                <div className="card-body">
                    <div className="row">
                        <table className="table table-cart table-mobile" style={{ margin: '10px' }}>
                            <thead>
                                <tr>
                                    <th>Mã đơn hàng</th>
                                    <th>Trạng thái</th>
                                    <th>Thành tiền</th>
                                    <th>Ngày đặt</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {userOrder ? console.log('userOrder', userOrder) : console.log('ss')} */}
                                {userOrder && userOrder.slice(0).reverse().map((item, index) => {
                                    return (
                                        <tr key={item._id}
                                        >
                                            <td className="product-col">
                                                <div className="product">
                                                    <h3 className="product-title">
                                                        {item._id}
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="product-col">
                                                <div className="product">
                                                    <h3 className="product-title"
                                                    >
                                                        {getStatus(item.status, item.canceledAt)}
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="product-col">
                                                <span className="badge badge-danger"
                                                    style={{ fontSize: '1.4rem' }}>{item.totalPrice.toLocaleString('de-DE')}<sup>đ</sup></span>
                                            </td>
                                            <td className="product-col">
                                                <div className="cart-product-quantity">
                                                    {(new Date(item.createdAt)).getDate() + '-' + (Number((new Date(item.createdAt)).getMonth()) + 1) + '-' + (new Date(item.createdAt)).getFullYear()}
                                                </div>
                                            </td>
                                            <td className="product-col">
                                                <button type="button"
                                                    className="btn-info btn-sm"
                                                    onClick={(e) => onClickRead(item)}
                                                    style={{ fontSize: '1.4rem' }}><i className="icon-eye"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
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


export default connect(mapStateToProp)(Purchased);
