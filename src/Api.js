import axios from "axios"

export const getAllProduct = () => {
    return axios.get(`http://localhost:8080/api/products`)
}