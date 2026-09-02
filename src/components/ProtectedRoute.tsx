import React from "react";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  children?: React.ReactNode;
  allowedRoles: string[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const role = localStorage.getItem("userRole");

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role.toLowerCase())) {
    // Redirect to fallback dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // When used as a layout route, render children via Outlet
  return children ? <>{children}</> : <Outlet />;
}
