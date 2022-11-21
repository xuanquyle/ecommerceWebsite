import {
    FILTER_UPDATE_SUCCESS
} from '../constants/userConstants';

export const filter = (filters) => {
    return {
        type: FILTER_UPDATE_SUCCESS,
        payload: filters
    }
    
};
