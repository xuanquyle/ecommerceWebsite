import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
    forgotPasswordReducer,
    resetPasswordReducer,
    userDetailsReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer,
} from './reducers/userReducer';

const reducer = combineReducers({
    userLogin: userLoginReducer,
})
// login
// const userInfoFromLocalStorage = localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : null;
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const userIsLoggedINFromLocalStorage = localStorage.getItem('isLoggedIn') ? JSON.parse(localStorage.getItem('isLoggedIn')) : false;
userInfoFromLocalStorage ? console.log(userInfoFromLocalStorage) : console.log('eo');
console.log(userIsLoggedINFromLocalStorage);

const initialState = {
    userLogin: {
        isLoggedIn: userIsLoggedINFromLocalStorage ,
        userInfo: userInfoFromLocalStorage ? userInfoFromLocalStorage : null
    },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;