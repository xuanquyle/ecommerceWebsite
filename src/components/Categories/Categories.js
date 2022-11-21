import { Outlet } from "react-router-dom"
import Filters from "./Filters"
import Laptop from "./Laptop"


const Categories = () => {
    const title = "LAPTOP GAMING"
    return (
        <>
            <div className="col-md-12 bg-light pt-5 pb-6" style={{ background: 'black' }} >
                <div className="row">
                    <aside className="col-lg-3">
                        <Filters />
                    </aside>
                    <aside className="col-lg-9">
                        <Laptop />
                    </aside>
                </div>
            </div>
        </>
    )
}

export default Categories