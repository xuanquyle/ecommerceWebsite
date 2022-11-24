import p1 from "../../assets/images/demos/demo-4/products/product-10.jpg";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import queryString from "query-string"
import { getFiltersProduct } from "../../api";
import { connect, useDispatch, useSelector } from "react-redux";
import { filter as funFilter } from "../../store/actions/filterAction"
import { path } from "../../utils/constant"


const Laptop = (props) => {
    const dispatch = useDispatch();
    const userselector = useSelector(state => state);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 12,
        totalRow: 14,
        maxPage: 5,
    });
    const [filter, setFilter] = useState({
        page: 1,
        limit: 12,
        // any Filters
    });

    // const arrProduct = [
    //     {
    //         id: '001', cate: 'TV', tittle: 'MacBook Pro 13" Display, i5', price: '1,199.99',
    //         rating: '60%', review: '4',
    //     },
    //     {
    //         id: '002', cate: 'TV', tittle: 'MacBook Pro 13" Display, i5', price: '1,199.99',
    //         rating: '80%', review: '6',
    //     },
    //     {
    //         id: '003', cate: 'TV', tittle: 'MacBook Pro 13" Display, i5', price: '1,199.99',
    //         rating: '0.6', review: '4',
    //     },
    //     {
    //         id: '004', cate: 'TV', tittle: 'MacBook Pro 13" Display, i5', price: '1,199.99',
    //         rating: '0.8', review: '6',
    //     },
    //     {
    //         id: '005', cate: 'TV', tittle: 'MacBook Pro 13" Display, i5', price: '1,199.99',
    //         rating: '0.6', review: '4',
    //     },
    //     {
    //         id: '006', cate: 'TV', tittle: 'MacBook Pro 13" Display, i5', price: '1,199.99',
    //         rating: '0.8', review: '6',
    //     },
    //     {
    //         id: '007', cate: 'TV', tittle: 'MacBook Pro 13" Display, i5', price: '1,199.99',
    //         rating: '0.8', review: '6',
    //     },
    //     {
    //         id: '008', cate: 'TV', tittle: 'MacBook Pro 13" Display, i5', price: '1,199.99',
    //         rating: '0.8', review: '6',
    //     },
    // ]

    const [arrProduct, setArrProduct] = useState();
    const handlePageChange = (newPage) => {
        // console.log("New page: ", newPage);
        setFilter({
            ...filter,
            page: newPage
        })
        let pagiTemp = {
            ...filter,
            page: newPage
        }
        var data = { ...props.filters, filter: pagiTemp };
        localStorage.removeItem('pagination');
        localStorage.setItem('pagination', JSON.stringify(filter));
        dispatch(funFilter(data));

    }
    // const fetchDataProduct = async () => {
    //     try {
    //         const data = await getAllProduct();
    //         setArrProduct(data.data);
    //     } catch (error) {

    //     }
    // }
    useEffect(() => {
        fetchDataProductFilters();
    }, [props.filters])
    const fetchDataProductFilters = async () => {
        try {
            let arrProduct = await getFiltersProduct(props.filters);
            // console.log("FILTWERS", Object.keys(arrProduct.data).length)
            setArrProduct(arrProduct.data);
            setPagination({ ...pagination, totalRow: Object.keys(arrProduct.data).length })
        } catch (error) {

        }
    }


    return (
        <>

            <div className="container" style={{ backgroundColor: '#25304b', borderRadius: '20px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                <div className="heading heading-flex mb-3">
                </div>
                <div className="products">
                    <div className="row justify-content-center">
                        {arrProduct && arrProduct.slice(filter.limit * (filter.page - 1), filter.limit * (filter.page - 1) + filter.limit).map((item, index) => {
                            return (
                                <div className="col-6 col-md-4 col-lg-3" key={item._id}>
                                    <div className="product product-2"
                                        style={{ backgroundColor: '#fff' }}>
                                        <figure className="product-media pt-3 pb-3"
                                            style={{ backgroundColor: '#fff' }}>
                                            <a href="/" className="d-flex justify-content-center">
                                                <img src={path.SERVER_URL + '/' + item.thumb} alt="Product" className="product-image"
                                                style={{width: '70%'}} />
                                            </a>
                                            {/* <div className="product-action">
                                                <a href="#" className="btn-product btn-cart" title="Add to cart"><span>Thêm vào giỏ</span></a>
                                                <a href="popup/quickView.html" className="btn-product btn-quickview" title="Quick view"><span>Xem nhanh</span></a>
                                            </div> */}
                                        </figure>
                                        <div className="product-body">
                                            <div className="product-cat">
                                                <span href="#">{item.category ? item.category.name : ''}</span>
                                            </div>
                                            <h3 className="product-title"><a href="product.html">{item.name}</a></h3>
                                            <div className="product-price">

                                                {item.options[0] ? item.options[0].price.toLocaleString('de-DE') : ''} &nbsp; <sup>₫</sup>
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

const mapStateToProp = state => {
    return {
        filters: state.filters
    }
}


export default connect(mapStateToProp)(Laptop);