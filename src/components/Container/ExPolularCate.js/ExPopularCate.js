import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import p1 from "../../../assets/images/demos/demo-4/cats/1.png"
import p2 from "../../../assets/images/demos/demo-4/cats/2.png"
import p3 from "../../../assets/images/demos/demo-4/cats/3.png"
import hinh from "../../../assets/images/contact-header-bg.jpg"
import { getAllCategories } from "../../../api"

const ExPopularCate = () => {
    // const [cate, setCate] = useState();
    // let arrItem = [
    //     {
    //         id: '001', image: 'TV', tittle: 'Điện thoại',
    //     },
    //     {
    //         id: '002', image: 'TV', tittle: 'Laptop',
    //     },
    //     {
    //         id: '003', image: 'TV', tittle: 'Phụ kiên',
    //     },
    //     {
    //         id: '004', image: 'TV', tittle: 'Đồng hồ',
    //     }

    // ]

    let arrImage = [

        'http://localhost:8080/public/images/1669193555912v_ng_23.png',
        'http://localhost:8080/public/images/laptop-png-8.png',
        'http://localhost:8080/public/images/16691948910721.png'
    ]
    const [arrCate, setArrCate] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllCategories();
                setArrCate(data.data);
                // console.log(data);
            } catch (error) {

            }
        }
        fetchData();
    }, [])


    return (
        <>
            <div className="container" style={{ backgroundColor: 'rgb(255 237 160)', borderRadius: '12px', paddingTop: '20px' }}>
                <h2 className="title text-center mb-4">DANH MỤC NỔI BẬT</h2>
                <div className="cat-blocks-container">
                    <div className="row" >
                        {arrCate && arrCate.map((item, index) => {
                            return (
                                <Link to="/ProductDetails" className="col-6 col-sm-4 col-lg-2" key={item._id} style={{ cursor: 'pointer' }}>
                                    <div className="cat-block">
                                        <figure>
                                            <span>
                                                <img src={arrImage[index]} alt="Category image"
                                                    style={{ width: '100px', heigth: '100px' }} />
                                            </span>
                                        </figure>

                                        <h3 className="cat-block-title">{item.name}</h3>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="mb-5"></div>
        </>
    )
}

export default ExPopularCate