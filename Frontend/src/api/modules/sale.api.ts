import axiosInstance from "../axios/axiosInstance";

export const addSaleApi = async (formData: object) => {
  const response = await axiosInstance.post("/sale", formData);
  return response.data;
};

export const displaySalesApi = async () => {
  const response = await axiosInstance.get("/sale");
  return response.data;
};
