import Axios, { AxiosInstance } from 'axios';
import { create } from 'apisauce';
import configs from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance: AxiosInstance = Axios.create({
  timeout: 3 * 60 * 1000,
  baseURL: configs.apiDomain
});
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => Promise.reject(error)
);

const apisauceInstance = create({ baseURL: configs.apiDomain, ...axiosInstance });

export const sendGet = (url: string, params: any) => apisauceInstance.get(url, { params });
export const sendPost = (url: string, params: any) => apisauceInstance.post(url, params);
export const sendPut = (url: string, params: any) => apisauceInstance.put(url, params);
export const sendPatch = (url: string, params: any) => apisauceInstance.patch(url, params);
export const sendDelete = (url: string, params: any) => apisauceInstance.delete(url, { params });
