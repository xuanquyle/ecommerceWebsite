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

const ProductDetailsTop = () => {
    const arrColor = [
        {id: '001', color: 'đỏ'},
        {id: '002', color: 'xanh'},
        {id: '003', color: 'xanh dương'},
    ];
    const arrRom = [
        {id: '001', color: '32'},
        {id: '002', color: '64'},
        {id: '003', color: '128'},
    ];
    const [price, setPrice] = useState('123456789');
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
    const n = 123456789;
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
                            {n.toLocaleString()} &nbsp; <sup>₫</sup>
                        </div>

                        <div className="product-content">
                            <p>Sed egestas, ante et vulputate volutpat, eros semper est, vitae luctus metus libero eu augue.</p>
                        </div>
                        <Option option={arrColor} unit={''} />
                        <Option option={arrRom} unit={'GB'} />
                        <div className="product-details-action">
                            <div className="details-action-col">
                                <button className="btn-product btn-cart"><span>Thêm vào giỏ</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductDetailsTop