import axiosInstance from 'axios';
import { getConfig } from './config';

export const axios = axiosInstance.create({
  baseURL: getConfig().VITE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
