import axios from "axios";

// Lay tinh, huyen, xa
const getAllProvinces = () => {
    return axios.get(`https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1`);
}

const getDistrict = (id) => {
    return axios.get(`https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${id}&limit=-1`);
}

const getAllProduct = () => {
    return axios.get(`http://localhost:8080/api/products`);
}

const getProductBySlug = (slug) => {
    return axios.get(`http://localhost:8080/api/products/${slug}`);
}

const getAllCategories = () => {
    return axios.get(`http://localhost:8080/api/categories`)
}
// 
export { getAllProvinces, getDistrict, getAllProduct, getProductBySlug, getAllCategories}