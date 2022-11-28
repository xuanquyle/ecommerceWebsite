import hinh from "../../assets/images/products/single/sidebar-gallery/1.jpg"
import hinh2 from "../../assets/images/products/single/sidebar-gallery/1-small.jpg"
import hinh3 from "../../assets/images/products/single/sidebar-gallery/2-small.jpg"
import hinh4 from "../../assets/images/products/single/sidebar-gallery/3-small.jpg"
import hinh5 from "../../assets/images/products/single/sidebar-gallery/4-small.jpg"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import Option from "./Option"
import { path } from "../../utils/constant"
import { notify } from "../../utils/constant"
import { ToastContainer } from 'react-toastify'
import { addToCart as apiAddToCart } from '../../api';
import { connect, useDispatch, useSelector } from "react-redux";
import { cart as cartAction } from "../../store/actions/cartAction"

const ProductDetailsTop = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [product, setProduct] = useState(props.product)
    const [curIdOption, setCurIdOption] = useState('')
    const [curColor, setCurColor] = useState(props.product.options[0].color)
    const [curRam, setCurRam] = useState(props.product.options[0].ram)
    const [curRom, setCurRom] = useState(props.product.options[0].rom)
    const [fullOption, setFullOption] = useState(true);
    const [price, setPrice] = useState(props.product.options[0].price);
    const [qty, setQty] = useState(1);
    
    const [color, setColor] = useState(props.product.options.map((item, index) => {
        return (
            { 'id': item._id, 'op': item.color, 's': 1 }
        )
    }))

    const [ram, setRam] = useState(props.product.options.map((item, index) => {
        return (
            (curColor === item.color) ? { 'id': item._id, 'op': item.ram, 's': 1 }
                : { 'id': item._id, 'op': item.ram, 's': 0 }
        )
    }))
    const [rom, setRom] = useState(props.product.options.map((item, index) => {
        return (
            (curColor === item.color && curRam === item.ram) ? { 'id': item._id, 'op': item.rom, 's': 1 }
                : { 'id': item._id, 'op': item.rom, 's': 0 }
        )
    }))

    const handleChangeColor = (color) => {
        setCurColor(color);
        setCurRam('');
        setCurRom('');
        setFullOption(false)
        setRam(props.product.options.map((item, index) => {
            return (
                (color === item.color) ? { 'id': item._id, 'op': item.ram, 's': 1 }
                    : { 'id': item._id, 'op': item.ram, 's': 0 }
            )
        }))
        setRom(props.product.options.map((item, index) => {
            return (
                { 'id': item._id, 'op': item.rom, 's': 0 }
            )
        }))
    }

    const handleChangeRam = (ram) => {
        setCurRam(ram);
        setCurRom('');
        setFullOption(false)
        setRom(props.product.options.map((item, index) => {
            return (
                (curColor === item.color && ram === item.ram) ? { 'id': item._id, 'op': item.rom, 's': 1 }
                    : { 'id': item._id, 'op': item.rom, 's': 0 }
            )
        }))
    }

    const handleChangeRom = (rom) => {
        setCurRom(rom)
        setFullOption(true)
    }
    const onChangeQty = (e) => {
        console.log(e.target.value)
        setQty(e.target.value)
    }
    const addToCart = async () => {
        // alert("sss")
        // console.log(props.user.isLoggedIn);
        if (props.user.isLoggedIn && props.user.isLoggedIn !== '') {
            const newData = { product: props.product._id, option: curIdOption, qty: qty }
            console.log('>>>Check data', newData)
            if (window.confirm('Bạn có thêm sản phẩm này ?')) {
                try {
                    const rep = await apiAddToCart(props.user.isLoggedIn, props.user.id, newData)
                    notify('success', 'Thêm vào giỏ thành công !')
                    
                    // ACTION
                    localStorage.removeItem('amoutInCart');
                    localStorage.setItem('amoutInCart', JSON.stringify(Number(props.cart.amountIncart) + 1));
                    let data = { amountIncart: Number(props.cart.amountIncart) + 1}
                    dispatch(cartAction(data));
                } catch (error) {
                    notify('error', error.response.data.message)
                }
            } else {

            }
        } else notify('info', 'Bạn cần phải đăng nhập mới có thể thêm sản phẩm vào giỏ !')
        // navigate(path.CART)
    }
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    useEffect(() => {
        if (curColor !== '' && curRam !== '' && curRom !== '') {
            props.product.options.map((item) => {
                if (item.color === curColor && item.ram === curRam && item.rom === curRom) {
                    setPrice(item.price)
                    setCurIdOption(item._id)
                    setQty(qty)
                }
            })

        }
        else { setPrice(''); }
    }, [curColor, curRam, curRom])

    return (
        <>
            <ToastContainer
                theme="colored" />

            <div className="product-details-top">
                <div className="row">
                    <div className="col-md-4 " >
                        <div className="product-gallery">
                            <Slider {...settings}>
                                <div className="img-product-cau">
                                    <img src={path.SERVER_URL + "/" + props.product.thumb} alt="description" />
                                </div>
                                {/* <div className="img-product-cau">
                                <img src={hinh} alt="description" />
                            </div>
                            <div className="img-product-cau">
                                <img src={hinh} alt="description" />
                            </div>
                            <div className="img-product-cau">
                                <img src={hinh} alt="description" />
                            </div> */}
                            </Slider>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="product-details product-details-sidebar ml-5 shadow p-5 mb-5">
                            <h1 className="product-title">{props.product.name}</h1>
                            <div className="ratings-container">
                                <div className="ratings">
                                    <div className="ratings-val" style={{ width: '80%' }}></div>
                                </div>
                                <a className="ratings-text" href="/product-review-link" id="review-link">( 2 Reviews )</a>
                            </div>

                            <div className="product-price"
                                style={{ color: '#c00404', fontWeight: '450' }}>
                                {price.toLocaleString('de-DE')} &nbsp; <sup>₫</sup>
                            </div>

                            <div className="product-content">
                                <p>{props.product.short_description}</p>
                            </div>
                            <div className="mt-3">
                                <span>Màu:</span>
                                <Option option={color} unit={''} handleChangeOption={handleChangeColor}
                                    curOption={curColor}
                                />
                                <span>Ram:</span>
                                <Option option={ram} unit={'GB'} handleChangeOption={handleChangeRam}
                                    curOption={curRam} />
                                <span>Rom:</span>
                                <Option option={rom} unit={'GB'} handleChangeOption={handleChangeRom}
                                    curOption={curRom} />
                            </div>
                            <div className="product-details-action"
                                style={{ marginTop: '40px', color: '#fff !important', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                                {(fullOption === true) ?
                                    <div className="d-flex align-items-center">
                                        <button className="btn btn-info rounded"
                                            style={{ color: '#fff', fontSize: '1.6rem' }}
                                            onClick={addToCart}>
                                            <span><i className="icon-plus ml-n1"></i>Thêm vào giỏ</span>
                                        </button>
                                        <button className="btn btn-warning rounded ml-5"
                                            style={{ color: '#fff', fontSize: '1.6rem' }}
                                        // onClick={addToCart}
                                        >
                                            <span><i className="icon-shopping-cart ml-n1"></i>Mua ngay</span>
                                        </button>
                                        <label className="ml-5"
                                            style={{ margin: '0px' }}>Số lượng</label>
                                        <input type={'number'} className="form-control ml-3"
                                            min="1" max="5" value={qty}
                                            // defaultValue={1}
                                            onChange={(e) => onChangeQty(e)}
                                            style={{ marginBottom: '0px', width: '100px' }}></input>
                                        {/* <span clas>{qty ? qty : ''}</span> */}
                                    </div>
                                    : <div className="details-action-col">
                                        <button className="btn btn-info rounded"
                                            style={{ opacity: '0.6', color: '#fff', fontSize: '1.6rem' }}>
                                            <span><i className="icon-plus ml-n1"></i>Thêm vào giỏ</span></button>
                                        <button className="btn btn-warning rounded ml-5"
                                            style={{ color: '#fff', fontSize: '1.6rem', opacity: '0.6' }}>
                                            <span><i className="icon-shopping-cart ml-n1"></i>Mua ngay</span>
                                        </button>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
const mapStateToProp = state => {
    return {
        user: state.userLogin,
        cart: state.cart
    }
}

export default connect(mapStateToProp)(ProductDetailsTop);
