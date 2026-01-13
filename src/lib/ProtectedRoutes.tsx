// src/components/ProtectedRoutes.tsx
import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import {ROUTE_PATHS} from "@/routes.ts";


interface ProtectedRouteProps {
    children: ReactNode;
}

// List of public routes that don't require authentication
const PUBLIC_ROUTES = [
    ROUTE_PATHS.AUTH.SIGN_IN,
    ROUTE_PATHS.AUTH.SIGN_UP,
    ROUTE_PATHS.AUTH.FORGOT_PASSWORD,
    ROUTE_PATHS.AUTH.RESET_PASSWORD,
];

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const location = useLocation();
    const token = localStorage.getItem("token");

    // Check if current route is public
    // @ts-ignore
    const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);

    // If no token and trying to access protected route
    if (!token && !isPublicRoute) {
        // Save the attempted URL for redirect after login
        return <Navigate to={ROUTE_PATHS.PUBLIC.MAINPAGE} replace state={{ from: location }} />;
    }

    // If token exists but trying to access auth pages, redirect to profile
    if (token && isPublicRoute) {
        return <Navigate to={ROUTE_PATHS.APP.DASHBOARD} replace />;
    }

    return <>{children}</>;
};