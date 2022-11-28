import axios from "axios"

// LOGIN

export const Login = (data) => {
    return (
        axios({
            method: 'post',
            url: `http://localhost:8080/api/users/auth/login`,
            data: data
        })
    )
}

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

export const upateCategory = (id, data) => {
    return (
        axios({
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'put',
            url: `http://localhost:8080/api/categories/${id}`,
            data: data
        })
    )
}

export const deleteCategory = (id) => {
    return axios.delete(`http://localhost:8080/api/categories/${id}`)
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

export const updateProduct = (data, id) => {
    return (
        axios({
            headers: {
                // 'Content-Type': 'application/json',
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
                // 'Content-Type': `multipart/form-data; boundary=${data._boundary}`
            },
            method: 'put',
            url: `http://localhost:8080/api/products/${id}`,
            data: data
        })
    )
}

export const deleteProduct = (id) => {
    return (
        axios({
            headers: {
            },
            method: 'delete',
            url: `http://localhost:8080/api/products/${id}`,
        })
    )
}



export const getAllUSer = () => {
    return axios.get(`http://localhost:8080/api/users`)
}