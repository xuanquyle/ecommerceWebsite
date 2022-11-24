import "../assets/css/style.min.css"
import "../assets/css/style.css"
import { path } from "../ultils/constant"
import "../assets/bootstrap/dist/css/bootstrap.css"
// import "../assets/plugins/bower_components/chartist/dist/chartist.min.css"
import MainPage from "./MainPage"

import { Routes, Route, Link, BrowserRouter } from "react-router-dom"
import store from "../store/Store"
import { Provider, useSelector } from 'react-redux';

import Dashboard from "./Dashboard.js/Dashboard"
import ProductManager from "./ProductManager/ProductManager"
import UserManager from "./UserManager/UserManager"
import OrderManager from "./OrderManager/OrderManager"
import Login from "./Login/Login"
import Categories from "./Categories/Categories"
import Setting from "./Setting/Setting"


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={path.HOME} element={<MainPage />}>
            <Route path={path.CATEGORIES} element={<Categories />}></Route>
            <Route path={path.PRODUCTMANAGER} element={<ProductManager />}></Route>
            <Route path={path.USERMANAGER} element={<UserManager />}></Route>
            <Route path={path.ORDERMANAGER} element={<OrderManager />}></Route>
            <Route path={path.SETTING} element={<Setting />}></Route>
            <Route index element={<Dashboard />}></Route>
          </Route>
          <Route path={path.LOGIN} element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    // <></>
  );
}

export default App;
