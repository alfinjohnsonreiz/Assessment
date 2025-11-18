import axiosInstance from "../axios/axiosInstance";

export const fetchBillsApi = async () => {
  const response = await axiosInstance.get("/bill");
  return response.data;
};
