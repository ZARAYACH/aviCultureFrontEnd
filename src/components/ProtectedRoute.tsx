import React from "react";
import { refreshAccessToken, useAuth } from "../provider/AuthProvider";
import { Navigate, Outlet, RouteProps } from "react-router-dom";
import { PathRouteProps } from "react-router/dist/lib/components";
import { useAxios } from "../configuration/AxiosConfiguration";
import Login from "./login/Login";

interface ProtectedRouteProps extends PathRouteProps {
  requiredRoles: string[];
}

export const ProtectedRoute = ({
  requiredRoles,
}: ProtectedRouteProps): React.ReactElement => {
  const { payload, setAccessToken } = useAuth();
  const { axiosInstance, isRefreshingToken, setIsRefreshingToken } = useAxios();

  if (!payload || !payload?.exp || payload.exp > Date.now()) {
    refreshAccessToken(
      setAccessToken,
      axiosInstance,
      setIsRefreshingToken
    ).then(() => {
      if (
        payload &&
        payload?.exp &&
        payload.exp < Date.now() &&
        payload.roles &&
        requiredRoles.every((value) => payload.roles.includes(value))
      ) {
        return <Outlet />;
      }
    });
  } else if (
    payload &&
    payload?.exp &&
    payload.exp < Date.now() &&
    payload.roles &&
    requiredRoles.every((value) => payload.roles.includes(value))
  ) {
    return <Outlet />;
  }

  return <Login />;
};
