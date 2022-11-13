import "../assets/css//style.min.css"
import "../assets/css//style.css"
import { path } from "../ultils/constant"

import "../assets/bootstrap/dist/css/bootstrap.css"

// import "../assets/plugins/bower_components/chartist/dist/chartist.min.css"
import MainPage from "./MainPage"

import { Routes, Route, Link, BrowserRouter } from "react-router-dom"
import Dashboard from "./Dashboard.js/Dashboard"
import ProductManager from "./ProductManager/ProductManager"
import UserManager from "./UserManager/UserManager"


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path={path.HOME} element={<MainPage />}>
        <Route path={path.PRODUCTMANAGER} element={<ProductManager />}></Route>
        <Route path={path.UserManager} element={<UserManager />}></Route>
        <Route index element={<Dashboard />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
    
    // <></>
  );
}

export default App;
