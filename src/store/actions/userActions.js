import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
} from '../constants/userConstants';
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
    // try {
    //     dispatch({ type: USER_LOGIN_REQUEST });

    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     };

    //     const { data } = await request.post(`/api/user/login`, { email, password }, config);
    //     dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    //     // dispatch(listCart());
    //     localStorage.setItem('userInfo', JSON.stringify(data));
    // } catch (error) {
    //     const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    //     dispatch({
    //         type: USER_LOGIN_FAIL,
    //         payload: message,
    //     });
    //     toast.error(message, Toastobjects);
    // }
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