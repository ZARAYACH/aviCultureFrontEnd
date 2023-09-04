import React, { ReactElement } from "react";

import axios, { AxiosInstance } from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { Navigate, RoutesProps, useNavigate } from "react-router-dom";
import { AxiosError } from "axios/index";
import { useAxios } from "../configuration/AxiosConfiguration";

interface CustomJwtPayload extends JwtPayload {
  roles: string[];
}

const AuthContext = createContext<{
  payload: CustomJwtPayload | null;
  setAccessToken: (newToken: string) => void;
  token: string | null;
}>({
  token: null,
  payload: null,
  setAccessToken: () => {},
});

const AuthProvider = ({ children }: RoutesProps): ReactElement => {
  // State to hold the authentication token
  const { axiosInstance } = useAxios();
  const [token, setToken_] = useState<string | null>(
    localStorage.getItem("token")
  );

  // Function to set the authentication token
  const setAccessToken = (newToken: string) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] =
        "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(() => {
    let payload: CustomJwtPayload | null = null;
    if (token != null) {
      payload = jwtDecode(token);
    }
    return {
      token,
      payload,
      setAccessToken,
    };
  }, [token]);

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
export const refreshAccessToken = async (
  setAccessToken: (newToken: string) => void,
  axiosInstance: AxiosInstance,
  setIsRefreshingToken: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsRefreshingToken(true);
  await axiosInstance
    .post(process.env.REACT_APP_API_PREFIX + "/token/refresh")
    .then((value: { data: { access_token: string } }) => {
      setAccessToken(value.data.access_token);
    })
    .catch((reason: AxiosError) => {
      setAccessToken("");
      <Navigate to="/login" />;
    })
    .finally(() => setIsRefreshingToken(false));
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
