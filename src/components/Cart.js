import { useState, useEffect } from 'react'
import axios from "axios"
import hinh from "../assets/images/products/table/product-1.jpg"
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';

const Cart = () => {
    const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm();
    const [cart, setCart] = useState([
        { id: '001', name: 'Beige knitted elastic runner shoes', price: '8000000', quantity: '1' },
        { id: '003', name: 'Beige knitted elastic runner shoes', price: '8000000', quantity: '1' },
        { id: '002', name: 'Beige knitted elastic runner shoes', price: '8000000', quantity: '1' },
    ]);
    const [isOrder, setIsOrder] = useState(false)
    const onChaneQuantity = (event, op) => {
        const temp = cart.map(item =>
            item.id === op.id ? { ...item, quantity: event.target.value } : item
        )
        console.log(temp)
        setCart(temp);
    }

    const onChangeIsOrder = () => {
        setIsOrder(!isOrder)
    }

    return (
        <>
            {!isOrder && (
                <div className='container mt-5'>
                    <div className='row'>
                        <aside className='col-lg-9'>
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
                        </aside>
                        <aside className='col-lg-3'>
                            <div className="summary summary-cart">
                                <p className="summary-title"
                                    style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1.8rem', fontWeight: '700' }}>Tổng tiền tạm thời</p>
                                <p className='mt-3'
                                    style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1.8rem', fontWeight: '700', color: '#17a2b8' }}>
                                    {Number(100000).toLocaleString('de-DE')} &nbsp; <sup>₫</sup></p>
                                <hr />
                                <button className='btn btn-info rounded'
                                    onClick={onChangeIsOrder}
                                    style={{ width: '100%' }}>Tiến hành đặt hàng</button>
                            </div>
                        </aside>
                    </div>
                </div>
            )}

            {/* ORDER */}

            {isOrder && (
                <div
                    style={{ fontFamily: 'Arial, Helvetica, sans-serif' /*backgroundImage: 'linear-gradient(#2193b0 , #6dd5ed)'*/ }}
                >
                    <div className='container pt-5'>
                        <div className='row'>
                            <div className='col-md-8 mb-1'>
                                <button className='btn-ms btn-warning'
                                    onClick={onChangeIsOrder}
                                    style={{ borderRadius: '10px', padding: '0 15px', color: '#fff', outline: 'none', border: 'none' }}>trở lại</button>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-8 shadow p-3 mb-5'
                                style={{ borderRadius: '15px', backgroundColor: '#fff' }}>
                                <form onSubmit={handleSubmit()}>
                                    <h6 className='mt-2'>Thông tin khách hàng</h6>
                                    <div className="form-row mt-2">
                                        <div className="form-group col-md-12">
                                            <input type="email" className="form-control" id="inputEmail4"
                                                style={{ borderRadius: '20px' }}
                                                defaultValue="vohaituyen@gmail.com"
                                                disabled
                                                {...register("email", {
                                                })} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <input type="Họ và tên" className="form-control" id="inputEmail4" placeholder="Họ và tên (Bắt buộc)"
                                                style={{ borderRadius: '20px' }}
                                                {...register("name", {
                                                    // required: true,
                                                    minLength: 6
                                                })} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <input type="text" className="form-control" id="inputPassword4" placeholder="Số điện thoại (Bắt buộc)"
                                                style={{ borderRadius: '20px' }}
                                                {...register("phone", {
                                                    required: true,
                                                    minLength: 6
                                                })} />
                                        </div>
                                    </div>
                                    <h6 className='mt-2'>Địa chỉ giao hàng</h6>
                                    <div className="form-row mt-2">
                                        <div className="form-group col-md-12">
                                            <select className="form-control" id="inputAddress"
                                                style={{ borderRadius: '20px' }}
                                                {...register("category", {
                                                    required: true,
                                                })}>
                                                <option>aaaaaaaaaa</option>
                                                <option>aaaaaaaaaa</option>
                                                <option>aaaaaaaaaa</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <h6 htmlFor="exampleFormControlTextarea1">Ghi chú</h6>
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="8"
                                            placeholder=''
                                            style={{ borderRadius: '20px' }}
                                            {...register("note", {
                                                // required: true
                                            })} ></textarea>
                                    </div>
                                    <h6 className='mt-2'>Tổng tiền</h6>
                                    <div className="form-row mt-2">
                                        <div className="form-group col-md-12">
                                            <input type="text" className="form-control" id="inputPassword4" placeholder={Number(100000).toLocaleString('de-DE') + ' VND'}
                                                defaultValue={'1000000000000'}
                                                disabled
                                                style={{ borderRadius: '20px' }}
                                                {...register("phone", {
                                                    // required: true,
                                                    // minLength: 6
                                                })} />
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <div>
                                            <button className='btn btn-info rounded'
                                                // onClick={onChangeIsOrder}
                                                style={{ width: '100%' }}>
                                                Xác nhận đặc hàng
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
            )}
        </>
    )
}

export default Cart