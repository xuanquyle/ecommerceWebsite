import { Provider, useSelector } from 'react-redux';
import store from '../store/Store';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';


import MainPage from "./MainPage";
import PageContent from './ProductDetails/PageContent';
import Categories from './Categories/Categories';
import Main from './Main/Main';
import Login from './Login/Login';
import ScrollToTop from './ScrollToTop';
import { path } from '../utils/constant';
import Register from './Login/Register';
import ForgotPassword from './Login/ForgottPassword';
import UserProfile from './UserProfile/UserProfile';
import Cart from './Cart';
import Profile from './UserProfile/Profile';
import Address from './UserProfile/Address';
import Purchased from './UserProfile/Purchased';
import ChangePass from './UserProfile/ChangePass';
import Laptop from './Categories/Laptop';
import Contact from './Contact/Contact';


function App() {
  // // usePageViews();
  // const location = useLocation()
  // console.log('check page change', location.pathname)
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <React.StrictMode> */}
        <ScrollToTop />
        <Routes>
          <Route path={path.HOME} element={<MainPage />}>
            <Route path={path.PRODUCT} element={<Categories />} />
            {/* <Route path={path.SMARTPHONE} element={<Address />} />
              <Route path={path.TABLET} element={<Address />} />
              <Route path={path.LAPTOP} element={<Laptop />} /> */}
            <Route path={path.CONTACT} element={<Contact />} />
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
}

export default App;
