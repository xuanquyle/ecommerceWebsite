import axios from "axios"

export const getAllProduct = () => {
    return axios.get(`http://localhost:8080/api/products/all-product`)
}

// CATEGORIES
export const getAllCategory = () => {
    return axios.get(`http://localhost:8080/api/categories`)
}

export const createCategory = (data) => {
    return (
        axios({
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            url: `http://localhost:8080/api/categories`,
            data: data
        })
    )
}

// PRODUCT
export const createProduct = (data) => {
    return (
        axios({
            headers: {
                // 'Content-Type': 'application/json',
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
                // 'Content-Type': `multipart/form-data; boundary=${data._boundary}`
            },
            method: 'post',
            url: `http://localhost:8080/api/products`,
            data: data
        })
    )
}

export const getAllUSer = () => {
    return axios.get(`http://localhost:8080/api/products`)
}