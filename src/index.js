import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import store from './store/Store';

import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./utils/constant"
import "./assets/css/bootstrap.min.css";
import "./assets/css/style.css";
import "./assets/css/plugins/magnific-popup/magnific-popup.css";
import "./assets/css/plugins/jquery.countdown.css";

import PageContent from './components/ProductDetails/PageContent';
import LaptopPage from './components/Categories/Categories';
import Main from './components/Main/Main';
import Login from './components/Login/Login';
import ScrollToTop from './components/ScrollToTop';
import { path } from './utils/constant';
import Register from './components/Login/Register';
import ForgotPassword from './components/Login/ForgottPassword';
import UserProfile from './components/UserProfile/UserProfile';
import Cart from './components/Cart';
import Profile from './components/UserProfile/Profile';
import Address from './components/UserProfile/Address';
import Purchased from './components/UserProfile/Purchased';
import ChangePass from './components/UserProfile/ChangePass';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
  <Provider store={store}>
    <BrowserRouter>
      {/* <React.StrictMode> */}
      <ScrollToTop />
      <Routes>
        <Route path={path.HOME} element={<App />}>
          <Route path={path.LAPTOP} element={<LaptopPage />} />
          <Route path={path.SMARTPHONE} element={<PageContent />} />
          <Route path={path.ACCESSORY} element={<PageContent />} />
          <Route path={path.PRODUCTDETAILS} element={<PageContent />} />
          <Route path={path.CART} element={<Cart />} />
          <Route path={path.USERPROFILE} element={<UserProfile />}>
            <Route path={path.USERADDRESS} element={<Address />} />
            <Route path={path.USERPURECHASED} element={<Purchased />} />
            <Route path={path.USERCHANGEPASS} element={<ChangePass />} />
            {/* <Route path={path.HOME} element={<App />} /> */}
            <Route index element={<Profile />} />
          </Route>
          <Route index element={<Main />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.REGISTER} element={<Register />} />
        <Route path={path.FORGOTPASSWORD} element={<ForgotPassword />} />
      </Routes>
      {/* </React.StrictMode> */}
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
