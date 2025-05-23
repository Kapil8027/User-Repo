import axios from 'axios';

const API_URL = 'http://localhost:4200/auth';

const API_URI = 'http://localhost:4200';

export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

export const uploadAssignment = async (credentials) => {
  return axios.post(`${API_URI}/assignments`, credentials);
};
