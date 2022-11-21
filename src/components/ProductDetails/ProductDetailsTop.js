import hinh from "../../assets/images/products/single/sidebar-gallery/1.jpg"
import hinh2 from "../../assets/images/products/single/sidebar-gallery/1-small.jpg"
import hinh3 from "../../assets/images/products/single/sidebar-gallery/2-small.jpg"
import hinh4 from "../../assets/images/products/single/sidebar-gallery/3-small.jpg"
import hinh5 from "../../assets/images/products/single/sidebar-gallery/4-small.jpg"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import Option from "./Option"

const ProductDetailsTop = (props) => {
    const [product, setProduct] = useState(props.product)
    const [curColor, setCurColor] = useState(props.product.options[0].color)
    const [curRam, setCurRam] = useState(props.product.options[0].ram)
    const [curRom, setCurRom] = useState(props.product.options[0].rom)
    const [fullOption, setFullOption] = useState(true);
    const [price, setPrice] = useState(props.product.options[0].price);
    // console.log('detail', props.product)
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

    const handleChangeOption = (color, ram, rom) => {
        setCurColor(color);
        setCurColor(ram);
        setCurColor(rom);
        setColor(props.product.options.map((item, index) => {
            return (
                { 'id': item._id, 'op': item.color, 's': 1 }
            )
        }))

    }
    const addToCart = () => {
        alert("sss")
    }
    const settings = {
        // customPaging: function (i) {
        //     return (
        //         <a>
        //             <img src={hinh} alt="description" />
        //         </a>
        //     );
        // },
        // dots: true,
        // dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    useEffect(() => {
        if (curColor !== '' && curRam !== '' && curRom !== '') {
            props.product.options.map((item) => {
                if (item.color === curColor && item.ram === curRam && item.rom === curRom)
                    setPrice(item.price)
            })

        }
        else { setPrice(''); }
    }, [curColor, curRam, curRom])

    return (
        <div className="product-details-top">
            <div className="row">
                <div className="col-md-4">
                    <div className="product-gallery">
                        <Slider {...settings}>
                            <div className="img-product-cau">
                                <img src={hinh} alt="description" />
                            </div>
                            <div className="img-product-cau">
                                <img src={hinh} alt="description" />
                            </div>
                            <div className="img-product-cau">
                                <img src={hinh} alt="description" />
                            </div>
                            <div className="img-product-cau">
                                <img src={hinh} alt="description" />
                            </div>
                        </Slider>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="product-details product-details-sidebar ml-5">
                        <h1 className="product-title">IPhone 13 Pro Max</h1>
                        <div className="ratings-container">
                            <div className="ratings">
                                <div className="ratings-val" style={{ width: '80%' }}></div>
                            </div>
                            <a className="ratings-text" href="/product-review-link" id="review-link">( 2 Reviews )</a>
                        </div>

                        <div className="product-price">
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
                            style={{ marginTop: '40px' }}>
                            {(fullOption === true) ?
                                <div className="details-action-col">
                                    <button className="btn-product btn-cart"
                                        onClick={addToCart}>
                                        <span>Thêm vào giỏ</span>
                                    </button>
                                </div>
                                : <div className="details-action-col">
                                    <button className="btn-product btn-cart"
                                        disabled>
                                        <span>Thêm vào giỏ</span></button>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductDetailsTop