
// import {
//     FILTER_UPDATE_SUCCESS
// } from '../constants/userConstants';

// LOGIN
export const cartReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CART_AMOUTN_UPDATE':
            // console.log('ac', action)
            return action.payload
        default:
            return state;
    }
};
