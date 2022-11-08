import { useState, useEffect } from 'react'
import axios from "axios"
import hinh from "../assets/images/products/table/product-1.jpg"
import { Link } from 'react-router-dom'

const Cart = () => {

    // const arrCart = [
    //     { id: '001', name: 'Beige knitted elastic runner shoes', price: '8000000', quantity: '1' },
    //     { id: '003', name: 'Beige knitted elastic runner shoes', price: '8000000', quantity: '1'},
    //     { id: '002', name: 'Beige knitted elastic runner shoes', price: '8000000', quantity: '1'},
    // ]
    const [cart, setCart] = useState([
        { id: '001', name: 'Beige knitted elastic runner shoes', price: '8000000', quantity: '1' },
        { id: '003', name: 'Beige knitted elastic runner shoes', price: '8000000', quantity: '1' },
        { id: '002', name: 'Beige knitted elastic runner shoes', price: '8000000', quantity: '1' },
    ]);
    const onChaneQuantity = (event, op) => {
        const temp = cart.map(item =>
            item.id === op.id ? { ...item, quantity: event.target.value } : item
        )
        console.log(temp)
        setCart(temp);
    }
    return (
        <>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <table className="table table-cart table-mobile">
                            <thead>
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Tổng tiền</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {console.log(cart)}
                                {cart && cart.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td className="product-col">
                                                <div className="product">
                                                    <figure className="product-media">
                                                        <img src={hinh} alt="Product image" />
                                                    </figure>

                                                    <h3 className="product-title">
                                                        <Link to="/ProductDetails">{item.name}</Link>
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="price-col">{item.price}<sup>đ</sup></td>
                                            <td className="quantity-col">
                                                <div className="cart-product-quantity">
                                                    <input type="number" className="form-control"
                                                        style={{ fontSize: '16px' }}
                                                        value={item.quantity}
                                                        onChange={(event) => { onChaneQuantity(event, item) }} />
                                                </div>
                                            </td>
                                            <td className="total-col">$84.00</td>
                                            <td className="remove-col"><button className="btn-remove"><i className="icon-close"></i></button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <aside className='col-lg-12'>
                        <div className="summary summary-cart">
                            <h3 className="summary-title">Thông tin đơn hàng</h3>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    )
}

export default Cart