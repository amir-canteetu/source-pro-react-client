import axiosInstance from './axiosInstance';

export const getTenderData = async (tenderId) => {
  const response = await axiosInstance.get(`/v1/api/tenders/${tenderId}`);
  return response.data;
};

export const updateTenderData = async (tenderId, data) => {
  const response = await axiosInstance.put(`/v1/api/tenders/${tenderId}`, data);
  return response.data;
};
