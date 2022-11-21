import p from "../../../assets/images/demos/demo-4/banners/banner-4.jpg";
import p2 from "../../../assets/images/demos/demo-4/products/product-6.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const TrendingProducts = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
    };
    const arr = [
        { id: '001', image: '', cate: 'Điện thoại', tittle: 'Bose - SoundSport  wireless headphones', price: '199.99', rating_val: '80%', rating_text: '4' },
        { id: '002', image: '', cate: 'Điện thoại', tittle: 'Bose - SoundSport  wireless headphones', price: '199.99', rating_val: '60%', rating_text: '4' },
        { id: '003', image: '', cate: 'Điện thoại', tittle: 'Bose - SoundSport  wireless headphones', price: '199.99', rating_val: '40%', rating_text: '4' },
        { id: '004', image: '', cate: 'Điện thoại', tittle: 'Bose - SoundSport  wireless headphones', price: '199.99', rating_val: '100%', rating_text: '4' },
        { id: '005', image: '', cate: 'Điện thoại', tittle: 'Bose - SoundSport  wireless headphones', price: '199.99', rating_val: '80%', rating_text: '4' },
    ]

    const addClick = (e) => {
        alert('a');
    }
    return (
        <>
            <div className="mb-5"></div>

            <div className="pt-5 pb-6"
            style={{backgroundColor: 'rgb(211, 228, 243)'}}>
                <div className="container trending-products">
                    <div className="heading heading-flex mb-5">
                        <div className="heading-left">
                            <h2 className="title">XU HƯỚNG MUA SẮM</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-5col d-none d-xl-block">
                            <div className="banner">

                                <img src={p} alt="banner" onClick={(e) => { addClick() }} />

                            </div>
                        </div>
                        <div className="col-xl-4-5col">
                            <div className="tab-content tab-content-carousel just-action-icons-sm">
                                <div className="tab-pane p-0 fade show active" id="trending-top-tab" role="tabpanel" aria-labelledby="trending-top-link">
                                    <div className="owl-carousel owl-full carousel-equal-height carousel-with-shadow" data-toggle="owl" >
                                        <Slider {...settings}>
                                            {arr && arr.map((item, index) => {
                                                return (
                                                    <div className="product product-2" key={item.id}>
                                                        <figure className="product-media">
                                                            <img src={p2} alt="Product image"
                                                                className="product-image"
                                                                onClick={(e) => { addClick() }} />

                                                            <div className="product-action">
                                                                <p className="btn-product btn-cart" title="Add to cart" style={{ cursor: 'pointer' }}><span>thêm vào giỏ</span></p>
                                                                <p className="btn-product btn-quickview" title="Quick view" style={{ cursor: 'pointer' }}><span>xem nhanh</span></p>
                                                            </div>
                                                        </figure>

                                                        <div className="product-body">
                                                            <div className="product-cat">
                                                                <a href="#">{item.cate}</a>
                                                            </div>
                                                            <h3 className="product-title"><a href="product.html">{item.tittle}</a></h3>
                                                            <div className="product-price">
                                                                ${item.price}
                                                            </div>
                                                            <div className="ratings-container">
                                                                <div className="ratings">
                                                                    <div className="ratings-val" style={{ width: item.rating_val }}></div>
                                                                </div>
                                                                <span className="ratings-text">( {item.rating_text} Reviews )</span>
                                                            </div>

                                                            {/* <div className="product-nav product-nav-dots">
                                                    <a href="#" style="background: #69b4ff;"><span className="sr-only">Color name</span></a>
                                                    <a href="#" style="background: #ff887f;"><span className="sr-only">Color name</span></a>
                                                    <a href="#" className="active" style="background: #333333;"><span className="sr-only">Color name</span></a>
                                                </div> */}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </Slider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrendingProducts