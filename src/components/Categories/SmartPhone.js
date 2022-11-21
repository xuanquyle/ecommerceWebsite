import p1 from "../../assets/images/demos/demo-4/products/product-10.jpg";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import queryString from "query-string"


const SmartPhone = (props) => {
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 4,
        totalRow: 100
    });
    const [filter, setFilter] = useState({
        page: 1,
        limit: 4,
        // any Filters
    });

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

    const handlePageChange = (newPage) => {
        console.log("New page: ", newPage);
        setFilter({
            ...filter,
            page: newPage
        })
        console.log('filter', filter)
    }

    useEffect(() => {
        setPagination({
            ...pagination,
            page: filter.page
        });
        console.log('pagi', pagination)
        try {
            const paramString = queryString.stringify(filter);

            // GET API
        } catch (error) {

        }
    }, [filter])
    return (
        <>

            <div className="container" style={{backgroundColor: '#25304b', borderRadius: '20px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
                <div className="heading heading-flex mb-3">
                </div>
                <div className="products">
                    <div className="row justify-content-center">
                        {arrItem && arrItem.map((item, index) => {
                            return (
                                <div className="col-6 col-md-4 col-lg-3" key={item.id}>
                                    <div className="product product-2">
                                        <figure className="product-media">
                                            <a href="/">
                                                <img src={p1} alt="Product" className="product-image"  />
                                            </a>
                                            {/* <div className="product-action">
                                                <a href="#" className="btn-product btn-cart" title="Add to cart"><span>Thêm vào giỏ</span></a>
                                                <a href="popup/quickView.html" className="btn-product btn-quickview" title="Quick view"><span>Xem nhanh</span></a>
                                            </div> */}
                                        </figure>
                                        <div className="product-body">
                                            <div className="product-cat">
                                                <span href="#">{item.cate}</span>
                                            </div>
                                            <h3 className="product-title"><a href="product.html">{item.tittle}</a></h3>
                                            <div className="product-price">
                                                $214.49
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
                    </div>
                </div>
                <Pagination
                    pagination={pagination}
                    onPageChange={handlePageChange}
                />
            </div>
        </>
    )
}

export default SmartPhone