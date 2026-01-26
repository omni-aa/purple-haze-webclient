import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/routes.ts";

interface AuthState {
    isAuthenticated: boolean;
    username: string | null;
    token: string | null;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

export const useAuth = (): AuthState => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    // Logout function
    const logout = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setIsAuthenticated(false);
        setUsername(null);
        setToken(null);
        navigate(ROUTE_PATHS.PUBLIC.MAINPAGE);
    }, [navigate]);

    // Refresh user info from /me endpoint
    const refreshUser = useCallback(async () => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            logout();
            return;
        }

        try {
            const res = await fetch("/dashboard/me", {
                headers: { Authorization: `Bearer ${storedToken}` },
            });

            if (!res.ok) {
                logout();
                return;
            }

            const data = await res.json();
            if (data.user?.username) {
                setUsername(data.user.username);
                setIsAuthenticated(true);
                setToken(storedToken);
                localStorage.setItem("username", data.user.username);
                localStorage.setItem("token", storedToken);
            } else {
                logout();
            }
        } catch (err) {
            console.error("Failed to refresh user:", err);
            logout();
        }
    }, [logout]);

    // On mount, initialize auth state
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUsername = localStorage.getItem("username");

        if (storedToken && storedUsername) {
            setToken(storedToken);
            setUsername(storedUsername);
            setIsAuthenticated(true);

            // Optionally verify token with /me endpoint
            refreshUser();
        } else {
            logout();
        }
    }, [logout, refreshUser]);

    return { isAuthenticated, username, token, logout, refreshUser };
};
