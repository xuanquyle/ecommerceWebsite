import axios from "axios";

// LOGIN
const Login = (data) => {
    return (
        axios({
            method: 'post',
            url: `http://localhost:8080/api/users/login`,
            data: data
        })
    )
}
const getProfileUser = (accessToken, id) => {
    return (
        axios({
            headers: {
                // 'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
                "token": `Bearer ${accessToken}`
            },
            method: 'get',
            url: `http://localhost:8080/api/users/${id}`,
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
            url: `http://localhost:8080/api/users/${id}`,
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
            url: `http://localhost:8080/api/users/address/${idUser}/delete/${idAddress}`,
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
            url: `http://localhost:8080/api/users/address/${id}/add`,
            data: data
        })
    )
}
// END API ADDRESS

const getAllProduct = () => {
    return axios.get(`http://localhost:8080/api/products`);
}


const getFiltersProduct = (params) => {
    const paramsData = new URLSearchParams({
        category: params.cate === 'ALL' ? '' : params.cate,
        max_price: params.price === 'ALL' ? '' : Number(params.price * 1000000000),
        min_price: params.price === 'ALL' ? '' : Number((params.price - 5) * 1000000000),
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
// 
export {
    getAllProvinces, getDistrict, getAllProduct, getProductBySlug, getAllCategories, getWard, Login,
    getProfileUser, createAddress, deleteAddress, updateProfile, getFiltersProduct
}