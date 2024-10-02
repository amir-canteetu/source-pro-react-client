import axiosInstance from './axiosInstance';

export const getUserData = async (userId) => {
  const response = await axiosInstance.get(`/v1/api/users/${userId}`);
  return response.data;
};

export const updateUserData = async (userId, data) => {
  const response = await axiosInstance.put(`/v1/api/users/${userId}`, data);
  return response.data;
};
