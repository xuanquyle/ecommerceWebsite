import axios from "axios";

// LOGIN
const Login = (data) => {
    return (
        axios({
            method: 'post',
            url: `http://localhost:8080/api/users/auth/login`,
            data: data
        })
    )
}
const Register = (data) => {
    return (
        axios({
            method: 'post',
            url: `http://localhost:8080/api/users/auth/register`,
            data: data
        })
    )
}

const changePassword = (accessToken, id, data) => {
    return (
        axios({
            headers: {
                // 'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
                "token": `Bearer ${accessToken}`
            },
            method: 'post',
            url: `http://localhost:8080/api/users/me/${id}/change-password`,
            data: data
        })
    )
}

// 
const searchData = (data) => {
    return (
        axios({
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'get',
            url: `http://localhost:8080/api/products/all-product?${data}`,
            // data: data
        })
    )
}
// const verifyEmail 

const getProfileUser = (accessToken, id) => {
    return (
        axios({
            headers: {
                // 'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
                "token": `Bearer ${accessToken}`
            },
            method: 'get',
            url: `http://localhost:8080/api/users/me/${id}`,
        })
    )
}
const updateProfile = (accessToken, id, data) => {
    return (
        axios({
            headers: {
                "Access-Control-Allow-Origin": "*",
                "token": `Bearer ${accessToken}`
            },
            method: 'put',
            url: `http://localhost:8080/api/users/me/${id}`,
            data: data
        })
    )
}
// Lay tinh, huyen, xa
const getAllProvinces = () => {
    return axios.get(`https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1`);
}

const getDistrict = (id) => {
    return axios.get(`https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${id}&limit=-1`);
}
const getWard = (id) => {
    return axios.get(`https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${id}&limit=-1`);
}

const deleteAddress = (accessToken, idUser, idAddress) => {
    return (
        axios({
            headers: {
                // 'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
                "token": `Bearer ${accessToken}`
            },
            method: 'delete',
            url: `http://localhost:8080/api/users/me/${idUser}/address/${idAddress}`,
        })
    )
}

// const getProfileUser = (accessToken, id) => {
//     return (
//         axios({
//             headers: {
//                 'content-type': 'multipart/form-data',
//                 "Access-Control-Allow-Origin": "*",
//                 "token": `Bearer ${accessToken}`
//             },
//             method: 'get',
//             url: `http://localhost:8080/api/users/address/${id}`,
//         })
//     )
// }

const createAddress = (accessToken, id, data) => {
    return (
        axios({
            headers: {
                // 'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
                "token": `Bearer ${accessToken}`
            },
            method: 'post',
            url: `http://localhost:8080/api/users/me/${id}/address`,
            data: data
        })
    )
}
// END API ADDRESS

// USERCART


const getAllProduct = () => {
    return axios.get(`http://localhost:8080/api/products`);
}


const getFiltersProduct = (params) => {
    // let minPriceTemp = (Number(params.price) === 10) 
    const paramsData = new URLSearchParams({
        category: params.cate === 'ALL' ? '' : params.cate,
        max_price: params.price === 'ALL' ? '' : (Number(params.price) === 30 ? 1000000000 : Number(params.price * 1000000)),
        min_price: params.price === 'ALL' ? '' : (Number(params.price) === 10) ? 0 : Number((params.price - 5) * 1000000),
        max_ram: params.ram === 'ALL' ? '' : params.ram,
        min_ram: params.ram === 'ALL' ? '' : params.ram,
        max_rom: params.rom === 'ALL' ? '' : params.rom,
        min_rom: params.rom === 'ALL' ? '' : params.rom,
    }).toString();
    console.log(paramsData)
    return (
        axios({
            headers: {
                // 'content-type': 'multipart/form-data',
                // "Access-Control-Allow-Origin": "*",
                // "token": `Bearer ${accessToken}`
            },
            method: 'get',
            url: `http://localhost:8080/api/products?${paramsData}`,
            // data: data
        })
    )
}


const getProductBySlug = (slug) => {
    return axios.get(`http://localhost:8080/api/products/${slug}`);
}

const getAllCategories = () => {
    return axios.get(`http://localhost:8080/api/categories`)
}
const getAddress = () => {
    return axios.get(`http://localhost:8080/api/categories`)
}

// CART
const addToCart = (accessToken, id, data) => {
    return (
        axios({
            headers: {
                // 'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
                "token": `Bearer ${accessToken}`
            },
            method: 'post',
            url: `http://localhost:8080/api/carts/me/${id}`,
            data: data
        })
    )
}
const getCartById = (accessToken, id,) => {
    return (
        axios({
            headers: {
                // 'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
                "token": `Bearer ${accessToken}`
            },
            method: 'get',
            url: `http://localhost:8080/api/carts/me/${id}`,
        })
    )
}

const deleteItemInCart = (accessToken, id, data) => {
    return (
        axios({
            headers: {
                // 'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
                "token": `Bearer ${accessToken}`
            },
            method: 'delete',
            url: `http://localhost:8080/api/carts/me/${id}`,
            data: data
        })
    )
}
// ORDER
const getUserOrder = (accessToken, id) => {
    return (
        axios({
            headers: {
                // 'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
                "token": `Bearer ${accessToken}`
            },
            method: 'get',
            url: `http://localhost:8080/api/orders/me/${id}`,
        })
    )
}

const addOrder = (accessToken, id, data) => {
    return (
        axios({
            headers: {
                // 'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
                "token": `Bearer ${accessToken}`
            },
            method: 'post',
            url: `http://localhost:8080/api/orders/me/${id}`,
            data: data
        })
    )
}

const cancelOrder = (accessToken, id, order_id) => {
    // id : order id
    return (
        axios({
            headers: {
                // 'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
                "token": `Bearer ${accessToken}`
            },
            method: 'put',
            url: `http://localhost:8080/api/orders/me/${id}/cancel-order/${order_id}`,
        })
    )
}

export {
    getAllProvinces, getDistrict, getAllProduct, getProductBySlug, getAllCategories, getWard, Login, changePassword,
    getProfileUser, createAddress, deleteAddress, updateProfile, getFiltersProduct, addToCart, getCartById, deleteItemInCart,
    Register, addOrder, getUserOrder, cancelOrder, searchData
}