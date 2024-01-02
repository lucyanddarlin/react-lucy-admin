import { message as Message } from 'antd';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { isEmpty } from 'ramda';

import { t } from '@/locales/i18n';
import { Result } from '@/types/api';
import { ResultEnum } from '@/types/enum';
// 创建 axios 实例
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API as string,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

// 请求拦截
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = 'Bearer Token';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 相应拦截
axiosInstance.interceptors.response.use(
  (res: AxiosResponse<Result>) => {
    if (!res.data) {
      throw new Error(t('sys.api.apiRequestFailed'));
    }
    const { status, data, message } = res.data;
    const hasSuccess = data && Reflect.has(res.data, 'status') && status === ResultEnum.SUCCESS;
    if (hasSuccess) {
      return data;
    }

    throw new Error(message || t('sys.api.apiRequestFailed'));
  },
  (error: AxiosError<Result>) => {
    const { response, message } = error || {};
    let errMsg = '';
    try {
      errMsg = response?.data.message || message;
    } catch (error) {
      throw new Error(error as unknown as string);
    }
    if (isEmpty(errMsg)) {
      errMsg = t('sys.api.errorMessage');
    }
    Message.error(errMsg);
    return Promise.reject(error);
  },
);

class APIClient {
  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .request<any, AxiosResponse<Result>>(config)
        .then((res: AxiosResponse<Result>) => {
          resolve(res as unknown as Promise<T>);
        })
        .catch((err: Error | AxiosError) => {
          reject(err);
        });
    });
  }

  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' });
  }

  post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' });
  }

  put<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PUT' });
  }

  delete<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' });
  }
}

export default new APIClient();
