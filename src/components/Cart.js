import { useState, useEffect } from 'react'
import axios from "axios"
import hinh from "../assets/images/products/table/product-1.jpg"
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { connect } from "react-redux";
import { getCartById, getProfileUser } from '../api';
import { path } from '../utils/constant';

const Cart = (props) => {
    const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm();
    const [cart, setCart] = useState();
    const [curOption, setCurOption] = useState(0);
    const [totalPrice, setTotalPrice] = useState();
    const [isOrder, setIsOrder] = useState(false)
    const [address, setAddress] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [order, setOrder] = useState({
        cart_id: '',
        orderItems: '',
        shippingAddress: '',
        totalPrice: '',
        email: '',
        phone: '',
        address: '',
        name: ''
    })
    const onChaneQuantity = (event, op) => {
        const temp = cart.map(item =>
            item.id === op.id ? { ...item, quantity: event.target.value } : item
        )
        console.log(temp)
        setCart(temp);
    }

    const onChangeIsOrder = async () => {
        const orderItemsTemp = cart.cartItems.map((item) => {
            return { product: item.product._id, option: item.option, qty: item.qty }
        })
        // console.log('ordetItem', orderItemsTemp)
        try {
            let res = await getProfileUser(props.user.isLoggedIn, props.user.id)
            // console.log(res.data.addresses);
            setName(res.data.addresses[0].customer_name)
            setPhone(res.data.addresses[0].customer_phone)
            setAddress(res.data)
        } catch (error) {

        }
        setOrder({
            cart_id: cart._id,
            orderItems: orderItemsTemp,
            shippingAddress: '',
            totalPrice: totalPrice,
        })
        setIsOrder(!isOrder)
    }
    const fetchDataCart = async () => {
        console.log(props.user.isLoggedIn, props.user.id)
        try {
            const rep = await getCartById(props.user.isLoggedIn, props.user.id)
            setCart(rep.data[0])
            let totalTemp = 0
            const temp = rep.data[0].cartItems.map((item) => {
                return (
                    item.product.options.map((item2) => {
                        if (item2._id === item.option) {
                            totalTemp += Number(item2.price) * Number(item.qty)
                            // console.log('total',item2.price,item.qt)                           
                            return item2;
                        }
                    }))
            })
            setTotalPrice(totalTemp)
            setCurOption(temp)
            console.log(temp);
        } catch (error) {

        }
    }
    const onChangeAddress = (e) => {
        console.log("check id address", e, address);
        setName(address.addresses[e].customer_name)
        setPhone(address.addresses[e].customer_phone)
    }
    const onSubmitOrder = (data) => {
        setOrder({
            ...order,
            email: data.email,
            phone: data.phone,
            address: data.address,
            name: data.name
        })
        console.log("data submit", data, order)
    }
    useEffect(() => {
        fetchDataCart();
    }, [])

    return (
        <>
            {!isOrder && cart && cart.cartItems && (
                <div className='container mt-5'>
                    <div className='row'>
                        <aside className='col-lg-9'>
                            <table className="table table-cart table-mobile">
                                <thead>
                                    <tr>
                                        {/* <th></th> */}
                                        <th>Tên sản phẩm</th>
                                        <th>Tùy chọn</th>
                                        <th>Số lượng</th>
                                        <th>price</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {console.log(cart)}
                                    {cart.cartItems && cart.cartItems.map((item, index) => {
                                        return (
                                            <tr key={item._id}>
                                                {/* <td className="price-col d-flex justify-content-center"
                                                    style={{ margin: '0', width: '100%' }}>

                                                </td> */}
                                                <td className="price-col">
                                                    <div className="product1 mr-2 d-flex align-items-center">
                                                        <div className="product1 mr-4" style={{ width: '70px', margin: '0' }}>
                                                            <img src={path.SERVER_URL + '/' + item.product.thumb}
                                                                style={{ width: '70px', margin: '0' }} />
                                                        </div>
                                                        <h3 className="product-title">
                                                            <Link to="/ProductDetails">
                                                                {item.product.name.length > 30 ? item.product.name.slice(0, 30) + "..." : item.product.name}
                                                            </Link>
                                                        </h3>
                                                    </div>
                                                </td>
                                                <td className="price-col">
                                                    <p>Màu{' ' + curOption[index][0].color}</p>
                                                    <p>Ram{' ' + curOption[index][0].ram}</p>
                                                    <p>Rom{' ' + curOption[index][0].rom}</p>
                                                </td>
                                                <td className="quantity-col">
                                                    <p>{item.qty}</p>
                                                </td>
                                                <td className="total-col">{' ' + (curOption[index][0].price * item.qty).toLocaleString('de-DE')}&nbsp; <sup>₫</sup></td>
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
                                    {totalPrice.toLocaleString('de-DE')} &nbsp; <sup>₫</sup></p>
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

            {isOrder && address && (
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
                                <form onSubmit={handleSubmit(onSubmitOrder)}>
                                    <h6 className='mt-2'>Thông tin khách hàng</h6>
                                    <div className="form-row mt-2">
                                        <div className="form-group col-md-12">
                                            <input type="email" className="form-control" id="inputEmail4"
                                                style={{ borderRadius: '20px' }}
                                                value={address.email}
                                                disabled
                                                {...register("email", {
                                                    value: address.email
                                                })} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <input type="Họ và tên" className="form-control" id="inputEmail4" placeholder="Họ và tên (Bắt buộc)"
                                                value={name}
                                                style={{ borderRadius: '20px' }}
                                                {...register("name", {
                                                    required: true,
                                                    value: name,
                                                    // minLength: 6
                                                })} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <input type="text" className="form-control" id="inputPassword4" placeholder="Số điện thoại (Bắt buộc)"
                                                style={{ borderRadius: '20px' }}
                                                value={phone}
                                                {...register("phone", {
                                                    required: true,
                                                    value: phone
                                                    // minLength: 6
                                                })} />
                                        </div>
                                    </div>
                                    <h6 className='mt-2'>Địa chỉ giao hàng</h6>
                                    <div className="form-row mt-2">
                                        <div className="form-group col-md-12">
                                            <select className="form-control" id="inputAddress"
                                                style={{ borderRadius: '20px' }}
                                                {...register("address", {
                                                    required: true,
                                                    onChange: (e) => onChangeAddress(e.target.options.selectedIndex)
                                                })}>
                                                {address.addresses && address.addresses.map((item, index) => {
                                                    return (
                                                        <option value={item.address} key={item._id}>{item.address}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    {/* <div className="form-group">
                                        <h6 htmlFor="exampleFormControlTextarea1">Ghi chú</h6>
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="8"
                                            placeholder=''
                                            style={{ borderRadius: '20px' }}
                                            {...register("note", {
                                                // required: true
                                            })} ></textarea>
                                    </div> */}
                                    <h6 className='mt-2'>Tổng tiền</h6>
                                    <div className="form-row mt-2">
                                        <div className="form-group col-md-12">
                                            <input type="text" className="form-control" id="inputPassword4" placeholder={totalPrice.toLocaleString('de-DE') + ' VND'}
                                                // defaultValue={'1000000000000'}
                                                disabled
                                                style={{ borderRadius: '20px' }}
                                                {...register("phone", {
                                                    value: totalPrice
                                                    // required: true,
                                                    // minLength: 6
                                                })} />
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <div>
                                            <button className='btn btn-info rounded'
                                                type='submit'
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

const mapStateToProp = state => {
    return {
        user: state.userLogin
    }
}
export default connect(mapStateToProp)(Cart);