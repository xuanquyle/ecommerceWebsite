import { useState } from "react"

const Description = () => {

    const menu = [
        { id: '001', nav: 'Thông tin sản phẩm' },
        { id: '002', nav: 'Thông số kỹ thuật' }
    ]
    const p1 =``
    const p2 = '1111111111111'
    const [navActived, setNavActive] = useState(menu[0].id)
    const onClickNav = (item) => {
        setNavActive(item.id)
    }
    return (
        <div className="product-details-tab mt-10">
            <ul className="nav nav-pills " role="tablist">
                {menu && menu.map((item, index) => {
                    return (
                        <li className={'nav-item'} key={item.id}>
                            <p className={navActived === item.id ? 'nav-link active' : 'nav-link'}
                                style={{ cursor: 'pointer' }}
                                onClick={() => onClickNav(item)}>{item.nav}</p>
                        </li>
                    )
                })}
            </ul>

            <div className="tab-content">
                <div className="tab-pane fade show active" role="tabpanel" >
                    <div className="product-desc-content">
                        {p1}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Description