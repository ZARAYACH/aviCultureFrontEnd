import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { refreshAccessToken, useAuth } from "../provider/AuthProvider";
import { useEffect, useState } from "react";
import { log } from "console";

const apiUrl = process.env.REACT_APP_API_URL as string;

interface CustomAxiosResponse extends AxiosRequestConfig {
  retried: boolean;
}

export const useAxios = () => {
  const { setAccessToken } = useAuth();
  const [isRefreshingToken, setIsRefreshingToken] = useState(false);

  const instance = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async function (error: AxiosError) {
      const originalRequest = error.config as CustomAxiosResponse;

      if (!isRefreshingToken && error.response?.status === 401) {
        await refreshAccessToken(
          setAccessToken,
          instance,
          setIsRefreshingToken
        );
        console.log("refresssssssssss");
      }

      if (!originalRequest.retried) {
        originalRequest.retried = true;
        return instance(originalRequest);
      }
      return Promise.reject(error);
    }
  );
  return { axiosInstance: instance, isRefreshingToken, setIsRefreshingToken };
};
