import ImageBG1 from "../../assets/images/demos/demo-4/slider/slide-1.png"
import ImageBG2 from "../../assets/images/demos/demo-4/slider/slide-2.png"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const IntroProduct = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false
        
    };

    let arrItem = [
        {
            id: 'SM1sss', header_1: 'Deals and Promotions', header_2: 'Beats by', header_3: 'Dre Studio 3',
            oldPrice: '$349,95', newPrice: '$299', supNewPrice: '99'
        },
        {
            id: 'SM2', header_1: 'New Arrival', header_2: 'Apple iPad Pro', header_3: '12.9 Inch, 64GB',
            oldPrice: '$349,95', newPrice: '$299', supNewPrice: '99'
        }
    ]
    return (
        <>
            <div className="intro-slider-container mb-10">
                {/* <img src={ImageBG1} /> */}
                <div className="intro-slider owl-carousel owl-theme owl-nav-inside owl-light" data-toggle="owl">
                    <Slider {...settings}>
                        {arrItem && arrItem.map((item, index) => {
                            return (
                                <div key={item.id} >
                                    <div className="intro-slide" style={{ backgroundImage: `url(${ImageBG1})` }}>
                                        {/* <img src={ImageBG1}></img> */}
                                        <div className="container intro-content">
                                            <div className="row justify-content-end">
                                                <div className="col-auto col-sm-7 col-md-6 col-lg-5">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>
            {/* <span class="slider-loader"></span> */}
        </>
    )
}

export default IntroProduct