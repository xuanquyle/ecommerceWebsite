import ImageBG1 from "../../../assets/images/demos/demo-4/products/product-1.jpg"
//import ImageBG2 from "../../assets/images/demos/demo-4/slider/slide-2.png"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const NewArrivalsContent = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
    };
    let arrItem = [
        {
            id: '001', cate: 'TV', tittle: 'MacBook Pro 13" Display, i5', price: '1,199.99',
            rating: '60%', review: '4',
        },
        {
            id: '002', cate: 'TV', tittle: 'MacBook Pro 13" Display, i5', price: '1,199.99',
            rating: '80%', review: '6',
        },
        {
            id: '003', cate: 'TV', tittle: 'MacBook Pro 13" Display, i5', price: '1,199.99',
            rating: '0.6', review: '4',
        },
        {
            id: '004', cate: 'TV', tittle: 'MacBook Pro 13" Display, i5', price: '1,199.99',
            rating: '0.8', review: '6',
        },
        {
            id: '005', cate: 'TV', tittle: 'MacBook Pro 13" Display, i5', price: '1,199.99',
            rating: '0.6', review: '4',
        },
        {
            id: '006', cate: 'TV', tittle: 'MacBook Pro 13" Display, i5', price: '1,199.99',
            rating: '0.8', review: '6',
        },
    ]

    return (
        <Slider {...settings}>
            {arrItem && arrItem.map((item, index) => {
                return (
                    <div key={item.id} >
                        <div className="product product-2" style={{ margin: "0px 10px" }} >
                            <figure className="product-media">
                                <a href="/">
                                    <img src={ImageBG1} alt="Product image" className="product-image" />
                                </a>
                                <div className="product-action">
                                    <a href="/" className="btn-product btn-cart" title="Add to cart"><span>add to cart</span></a>
                                    <a href="popup/quickView.html" className="btn-product btn-quickview" title="Quick view"><span>quick view</span></a>
                                </div>
                            </figure>

                            <div className="product-body">
                                <div className="product-cat">
                                    <a href="/">{item.cate}</a>
                                </div>
                                <h3 className="product-title"><a href="product.html">{item.tittle}r</a></h3>
                                <div className="product-price">
                                    {item.price}
                                </div>
                                <div className="ratings-container">
                                    <div className="ratings">
                                        <div className="ratings-val" style={{ width: item.rating }}></div>
                                    </div>
                                    <span className="ratings-text">( {item.review} Reviews )</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </Slider>
    )
}

export default NewArrivalsContent