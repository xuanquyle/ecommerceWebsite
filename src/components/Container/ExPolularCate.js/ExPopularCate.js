import { useState } from "react"
import p from "../../../assets/images/demos/demo-4/cats/1.png"

const ExPopularCate = () => {
    // const [cate, setCate] = useState();
    let arrItem = [
        {
            id: '001', image: 'TV', tittle: 'Điện thoại',
        },
        {
            id: '002', image: 'TV', tittle: 'Laptop',
        },
        {
            id: '003', image: 'TV', tittle: 'Phụ kiên',
        },
        {
            id: '004', image: 'TV', tittle: 'Đồng hồ',
        }

    ]
    return (
        <>
            <div className="container" style={{ backgroundColor: '#fef5cf', borderRadius: '12px', paddingTop: '20px' }}>
                <h2 className="title text-center mb-4">DANH MỤC NỔI BẬT</h2>
                <div className="cat-blocks-container">
                    <div className="row" >
                        {arrItem && arrItem.map((item, index) => {
                            return (
                                <div className="col-6 col-sm-4 col-lg-2" key={item.id}>
                                    <a href="category.html" className="cat-block">
                                        <figure>
                                            <span>
                                                <img src={p} alt="Category image" />
                                            </span>
                                        </figure>

                                        <h3 className="cat-block-title">{item.tittle}</h3>
                                    </a>
                                </div>
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