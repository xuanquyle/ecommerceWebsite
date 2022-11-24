import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const path = {
    HOME: '/',
    ORDERMANAGER: '/OrderManager',
    USERMANAGER: '/UserManager',
    PRODUCTMANAGER: '/ProductManager',
    SETTING: '/Setting',
    CATEGORIES: '/Categories',
    PRODUCTDETAILS: '/ProductDetails',
    REGISTER: '/Register',
    FORGOTPASSWORD: '/ForgotPassword',
    USERPROFILE: '/UserProfile',
    USERPURECHASED: '/UserProfile/Purchassed',
    USERCHANGEPASS: '/UserProfile/ChangePassword',
    LOGIN: '/Login'
}

export const notify = (type, content) => {
    if (type === 'success') {
        toast.success(content, {
            position: toast.POSITION.TOP_RIGHT
        });
    }
    if (type === 'error') {
        toast.error(content, {
            position: toast.POSITION.TOP_RIGHT
        });
    }
    if (type === 'info') {
        toast.info(content, {
            position: toast.POSITION.TOP_RIGHT
        });
    }
};