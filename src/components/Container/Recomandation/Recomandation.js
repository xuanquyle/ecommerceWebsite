import p1 from "../../../assets/images/demos/demo-4/products/product-10.jpg";
import { path } from "../../../utils/constant"

const Recomandation = (props) => {

    const arrItem = [
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
        {
            id: '007', cate: 'TV', tittle: 'MacBook Pro 13" Display, i5', price: '1,199.99',
            rating: '0.8', review: '6',
        },
        {
            id: '008', cate: 'TV', tittle: 'MacBook Pro 13" Display, i5', price: '1,199.99',
            rating: '0.8', review: '6',
        },
    ]
    return (
        <>
            <div className="mb-5"></div>

            <div className="container for-you">
                <div className="heading heading-flex mb-3">
                    <div className="heading-left">
                        <h2 className="title">GỢI Ý HÔM NAY</h2>
                    </div>
                    {/* <div className="heading-right">
                        <a href="/" className="title-link">Xem thêm <i className="icon-long-arrow-right"></i></a>
                    </div> */}
                </div>
                <div className="products">
                    <div className="row justify-content-center">
                        {props.arrProduct && props.arrProduct.slice(0, 8).map((item, index) => {
                            return (
                                <div className="col-6 col-md-4 col-lg-3" key={item._id}>
                                    <div className="product product-2">
                                        <figure className="product-media">
                                            <a href="/">
                                                <img src={path.SERVER_URL + '/' + item.thumb} alt="Product image" className="product-image" />
                                            </a>
                                            <div className="product-action">
                                                <a href="#" className="btn-product btn-cart" title="Add to cart"><span>Thêm vào giỏ</span></a>
                                                <a href="popup/quickView.html" className="btn-product btn-quickview" title="Quick view"><span>Xem nhanh</span></a>
                                            </div>
                                        </figure>
                                        <div className="product-body">
                                            <div className="product-cat">
                                                <a href="#">{item.category.name}</a>
                                            </div>
                                            <h3 className="product-title"><a href="product.html">{item.name}</a></h3>
                                            {/* <div className="product-price">
                                                $214.49
                                            </div> */}
                                            <div className="ratings-container">
                                                <div className="ratings">
                                                    <div className="ratings-val" style={{ width: '100%' }}></div>
                                                </div>
                                                <span className="ratings-text">( {'5'} Reviews )</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Recomandation