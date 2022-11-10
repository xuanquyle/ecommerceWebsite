
import {
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
} from '../constants/userConstants';

// LOGIN
export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true, userInfo: action.payload
            };
        case USER_LOGOUT:
            return {
                ...state,
                isLoggedIn: false, userInfo: null
            };
        default:
            return state;
    }
};

