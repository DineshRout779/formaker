import { axiosClient } from './apiClient';

export const createForm = async () => {
  return await axiosClient.post(`/form`);
};

export const editForm = async (formId, data) => {
  return await axiosClient.put(`/form/${formId}`, data);
};

export const deleteForm = async (formId) => {
  return await axiosClient.delete(`/form/${formId}`);
};

export const getAllforms = async (signal) => {
  return await axiosClient.get(`/form`, { signal });
};

export const getForm = async (formId, signal) => {
  return await axiosClient.get(`/form/${formId}`, { signal });
};

export const submitForm = async (id, formValues) => {
  return await axiosClient.post(`/form/${id}`, formValues);
};
