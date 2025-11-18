import axiosInstance from "../axios/axiosInstance";

export const fetchStockApi = async () => {
  const response = await axiosInstance.get("/stock");
  return response.data;
};
