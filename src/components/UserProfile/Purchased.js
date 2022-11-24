import { useState, useEffect } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { notify } from "../../utils/constant"
import { ToastContainer } from 'react-toastify';

const Purchased = () => {
    const [cart, setCart] = useState([
        { id: '637c8748ce9841f2f205c2ef', name: 'Chờ xác nhận ', price: '3.500.000', quantity: '21/11/2022', a: 'elastic runner ' },
        { id: '637c8748ce9841f2sf05c2kf', name: 'Đang giao ', price: '54.500.000', quantity: '15/11/2022', a: 'elastic runner ' },
        { id: '637c8748ce9841fadf05c2et', name: 'Đã nhận hàng', price: '31.500.000', quantity: '14/11/2022', a: 'elastic runner ' },
        { id: '637c8748ce9841f2f205c2as', name: 'Đã nhận hàng', price: '47.500.000', quantity: '14/11/2022', a: 'elastic runner ' },
    ]);
    const onClickRead = () => {
        notify('success', 'Đặt hàng thành công !')
    }
    return (
        <div className="col-md-8">
            <ToastContainer theme='colored' />
            <div className="card mb-3">
                <div className="card-body">
                    <div className="row">
                        <table className="table table-cart table-mobile" style={{ margin: '10px' }}>
                            <thead>
                                <tr>
                                    <th>Mã</th>
                                    <th>Trạng thái</th>
                                    <th>Thành tiền</th>
                                    <th>Ngày đặt</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart && cart.map((item, index) => {
                                    return (
                                        <tr key={item.id}
                                        >
                                            <td className="product-col">
                                                <div className="product">
                                                    <h3 className="product-title">
                                                        <Link to="/ProductDetails">{item.id}</Link>
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="product-col">
                                                <div className="product">
                                                    <h3 className="product-title"
                                                    >
                                                        {item.name === 'Đã nhận hàng' ? (
                                                            <Link to="/ProductDetails"
                                                                style={{ color: 'green' }}>{item.name}</Link>)
                                                            : (
                                                                <Link to="/ProductDetails">{item.name}</Link>
                                                            )}

                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="product-col">{item.price}<sup>đ</sup></td>
                                            <td className="product-col">
                                                <div className="cart-product-quantity">
                                                    {item.quantity}
                                                    {/* <input type="text" className="form-control"
                                                        style={{ fontSize: '16px' }}
                                                    /> */}
                                                </div>
                                            </td>
                                            {/* <td className="product-col">$84.00</td> */}
                                            <td className="product-col">
                                                <button type="button"
                                                    className="btn-info btn-sm"
                                                    onClick={onClickRead}
                                                    style={{ fontSize: '1.4rem' }}><i className="icon-eye"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {/* <div className="col-sm-12 mt-2 mb-2 mr-2" style={{ display: 'flex', justifyContent: 'right' }}>
                            <button className="btn btn-info">Thêm địa chỉ</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Purchased