
import {
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
} from '../constants/userConstants';

// LOGIN
export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            // console.log('ac', action)
            return action.payload
        case USER_LOGOUT:
            return {
                isLoggedIn: '', userInfo: null
            };
        default:
            return state;
    }
};

