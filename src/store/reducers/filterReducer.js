
import {
    FILTER_UPDATE_SUCCESS
} from '../constants/userConstants';

// LOGIN
export const filterReducer = (state = {}, action) => {
    switch (action.type) {
        case FILTER_UPDATE_SUCCESS:
            // console.log('ac', action)
            return action.payload
        default:
            return state;
    }
};

