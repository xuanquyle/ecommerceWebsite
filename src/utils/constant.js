import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const path = {
    HOME: '/',
    LOGIN: '/Login',
    PRODUCT: '/Prouduct',
    LAPTOP: '/Categories/Laptop',
    CONTACT: '/Contact',
    TABLET: '/Categories/Tablet',
    PRODUCTDETAILS: '/ProductDetails/:slug',
    CART: '/Cart',
    REGISTER: '/Register',
    FORGOTPASSWORD: '/ForgotPassword',
    USERPROFILE: '/UserProfile',
    USERPURECHASED: '/UserProfile/Purchased',
    USERADDRESS: '/UserProfile/Address',
    USERCHANGEPASS: '/UserProfile/ChangePassword',
    SERVER_URL: 'http://localhost:8080',
    BLOG: '/Cart'
}

export const notify = (type, content) => {
    if (type === 'success') {
        toast.success(content, {
            position: toast.POSITION.TOP_RIGHT
        });
    }
    if (type === 'info') {
        toast.info(content, {
            position: toast.POSITION.TOP_RIGHT
        });
    }
    if (type === 'error') {
        toast.error(content, {
            position: toast.POSITION.TOP_RIGHT
        });
    }
};