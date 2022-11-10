import { useState, useEffect } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

const Purchased = () => {
    const [cart, setCart] = useState([
        { id: '001', name: 'Beige knitted ', price: 'shoes', quantity: 'elastic runner ', a: 'elastic runner ' },
        { id: '003', name: 'Beige knitted ', price: 'elastic  shoes', quantity: 'runner', a: 'elastic runner ' },
        { id: '002', name: 'Beige knitted ', price: 'elastic shoes', quantity: 'runner', a: 'elastic runner ' },
    ]);
    return (
        <div className="col-md-8">
            <div className="card mb-3">
                <div className="card-body">
                    <div className="row">
                        <table className="table table-cart table-mobile" style={{ margin: '10px' }}>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Thành tiền</th>
                                    <th>Số lượng</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart && cart.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td className="product-col">
                                                <div className="product">
                                                    <h3 className="product-title">
                                                        <Link to="/ProductDetails">{item.id}</Link>
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="product-col">
                                                <div className="product">
                                                    <h3 className="product-title">
                                                        <Link to="/ProductDetails">{item.name}</Link>
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="product-col">{item.price}<sup>đ</sup></td>
                                            <td className="product-col">
                                                <div className="cart-product-quantity">
                                                    <input type="number" className="form-control"
                                                        style={{ fontSize: '16px' }}
                                                    />
                                                </div>
                                            </td>
                                            <td className="product-col">$84.00</td>
                                            <td className="product-col">
                                                <button type="button"
                                                    className="btn-info btn-sm"
                                                    style={{ fontSize: '1.4rem' }}><i className="icon-edit"></i> Sửa</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div className="col-sm-12 mt-2 mb-2 mr-2" style={{ display: 'flex', justifyContent: 'right' }}>
                            <button className="btn btn-info">Thêm địa chỉ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Purchased