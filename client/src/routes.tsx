import { Navigate, useRoutes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { initDataIfAuthenticated, selectToken } from "./store/slices/auth";
import { useAppSelector } from "./store/hooks";
import DashboardLayout from "./layouts/dashboard";
import Employees from "./pages/Employees";
import Login from "./pages/Login";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import Register from "./pages/Register";

export default function Router() {
  const token = useAppSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(initDataIfAuthenticated());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return useRoutes([
    {
      path: "/dashboard",
      element: token ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [{ path: "", element: <Employees /> }],
    },
    {
      path: "/",
      element: token ? (
        <Navigate to="/dashboard" replace />
      ) : (
        <LogoOnlyLayout />
      ),
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <Navigate to="/login" /> },
      ],
    },
    { path: "*", element: <Navigate to="/login" replace /> },
  ]);
}
