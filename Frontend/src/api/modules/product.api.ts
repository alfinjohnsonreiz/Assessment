import axiosInstance from "../axios/axiosInstance";

export const addProductApi=async(formData:Object)=>{
    const response= await axiosInstance.post('/products',formData)
    return response.data;
}

export const fetchAllProductsApi=async()=>{
    const response= await axiosInstance.get('/products')
    return response.data;
}