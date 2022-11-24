import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import UserManager from "./UserManager/UserManager"

const MainPage = () => {

    return (
        <>
            <Navbar />
            <div className="row" 
            style={{color:'black'}}>
                <aside className="col-md-2 "
                style={{color:'black', boxShadow: '1px 0px 20px rgb(0 0 0 / 8%)', backgroundColor: '#fff', 
                paddingRight: '0px'}}>
                    <Sidebar />
                </aside>
                <aside className="col-md-10 px-0"
                // style={{ backgroundColor: '#edf1f5'}}
                >
                    <Outlet />
                </aside>
            </div>
        </>

        // <p>aaaaaaaaaaaaaa</p>
    )
}

export default MainPage