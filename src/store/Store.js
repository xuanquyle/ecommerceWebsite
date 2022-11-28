import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
    forgotPasswordReducer,
    resetPasswordReducer,
    userDetailsReducer,
    userLoginReducer,

} from './reducers/userReducer';
import { filterReducer } from './reducers/filterReducer'
import { cartReducer } from './reducers/cartReducer';
const reducer = combineReducers({
    userLogin: userLoginReducer,
    filters: filterReducer,
    cart: cartReducer
})
// login

const emailF = localStorage.getItem('email') ? JSON.parse(localStorage.getItem('email')) : null;
const userIsLoggedINFromLocalStorage = localStorage.getItem('isLoggedIn') ? JSON.parse(localStorage.getItem('isLoggedIn')) : '';
const idF = localStorage.getItem('id') ? JSON.parse(localStorage.getItem('id')) : '';

// FILTER
const priceF = localStorage.getItem('price') ? JSON.parse(localStorage.getItem('price')) : 'ALL';
const ramF = localStorage.getItem('ram') ? JSON.parse(localStorage.getItem('ram')) : 'ALL';
const romF = localStorage.getItem('rom') ? JSON.parse(localStorage.getItem('rom')) : 'ALL';
const cateF = localStorage.getItem('cate') ? JSON.parse(localStorage.getItem('cate')) : 'ALL';
const paginationF = localStorage.getItem('pagination') ? JSON.parse(localStorage.getItem('pagination')) : '';
// CART
const amountInCartF = localStorage.getItem('amoutInCart') ? JSON.parse(localStorage.getItem('amoutInCart')) : '';

const initialState = {
    userLogin: {
        isLoggedIn: userIsLoggedINFromLocalStorage,
        email: emailF,
        id: idF
    },
    filters: {
        cate: cateF,
        price: priceF,
        ram: ramF,
        rom: romF, 
        pagination: paginationF
    },
    cart: {
        amountInCart: amountInCartF
    }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;