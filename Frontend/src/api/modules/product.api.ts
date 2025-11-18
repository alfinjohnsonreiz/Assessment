import axiosInstance from "../axios/axiosInstance";

export const addProductApi=async(formData:Object)=>{
    const response= await axiosInstance.post('/products',formData)
    return response.data;
}

export const fetchAllProductsApi=async()=>{
    const response= await axiosInstance.get('/products')
    return response.data;
}

export const updateProductApi=async(product_id:string,formData:Object)=>{
    const response= await axiosInstance.put(`/products/${product_id}`,formData)
    return response.data;
}

export const deleteProductApi=async(product_id:string)=>{
    const response= await axiosInstance.delete(`/products/${product_id}`)
    return response.data
}