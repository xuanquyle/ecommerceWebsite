import axios from "axios";

// Lay tinh, huyen, xa
const getAllProvinces = () => {
    return axios.get(`https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1`);
}

const getDistrict = (id) => {
    return axios.get(`https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${id}&limit=-1`);
}

// 
export { getAllProvinces, getDistrict}