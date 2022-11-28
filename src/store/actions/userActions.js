// import {
//     USER_LOGIN_FAIL,
//     USER_LOGIN_REQUEST,
//     USER_LOGIN_SUCCESS,
// } from '../constants/userConstants';
// import { toast } from 'react-toastify';
// import request from '../../utils/request';

// const Toastobjects = {
//     pauseOnFocusLoss: false,
//     draggable: false,
//     pauseOnHover: false,
//     autoClose: 2000,
// };
// LOGIN
export const login = (payload) => {
    return {
        type: 'USER_LOGIN_SUCCESS',
        payload: payload
    }
    
};

export const logout = (payload=null) => {
    return {
        type: 'USER_LOGOUT',
        payload: payload
    }
}