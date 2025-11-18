import axiosInstance from "../axios/axiosInstance";

export const createPurchaseApi=async(formData:object)=>{
    const response=await axiosInstance.post('/purchase',formData);
    return response.data;
}

export const fetchAllPurchseApi=async()=>{
    const response= await axiosInstance.get('/purchase')
    return response.data
}