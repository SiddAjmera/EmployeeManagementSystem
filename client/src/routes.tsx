import { Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Employees from "./pages/Employees";
import NotFound from "./pages/Page404";
import { useAppSelector } from "./store/hooks";
import { getLoggedInUserAsync, selectToken } from "./store/slices/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "./store/apis/axios";
import { getEmployeesAsync } from "./store/slices/employee";

export default function Router() {
  const token = useAppSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      dispatch(getLoggedInUserAsync(token));
      dispatch(getEmployeesAsync());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return useRoutes([
    {
      path: "/dashboard",
      element: token ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/employees" replace /> },
        { path: "employees", element: <Employees /> },
      ],
    },
    {
      path: "/",
      element: token ? (
        <Navigate to="/dashboard/employees" replace />
      ) : (
        <LogoOnlyLayout />
      ),
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "404", element: <NotFound /> },
        { path: "/", element: <Navigate to="/dashboard" /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
