import { useState } from "react"
import { Outlet } from "react-router-dom"
import Filters from "./Filters"
import Laptop from "./Laptop"
import ScrollToTop from '../ScrollToTop';


const Categories = () => {
    const [isOpenFilter, setIsOpenFilter] = useState(true);
    const title = "LAPTOP GAMING"

    const handleChangeIsOpenFilter = () => {
        setIsOpenFilter(!isOpenFilter);
    }

    return (
        <>
        <ScrollToTop />
            <div className="col-md-12 bg-light pt-5 pb-6" style={{ background: 'black' }} >
                <div className="row">
                    {isOpenFilter && <aside className="col-lg-3">
                        <Filters />
                    </aside>
                    }
                    <aside className="col-lg-9">
                        <button className="btn-ms btn-primary mb-3"
                            style={{ borderRadius: '5px' }}
                            onClick={handleChangeIsOpenFilter}>
                            <i className="icon-bars"></i>
                        </button>
                        <Laptop />
                    </aside>
                </div>
            </div>
        </>
    )
}

export default Categories