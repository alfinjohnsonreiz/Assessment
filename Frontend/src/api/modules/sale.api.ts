import axiosInstance from "../axios/axiosInstance"

export const addSaleApi=async(formData:object)=>{
    const response= await axiosInstance.post('/sale',formData)
    return response.data
}