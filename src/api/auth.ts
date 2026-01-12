import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000",
});

export const signup = (username: string, email: string, password: string) =>
    API.post("/signup", { username, email, password });

export const signin = (email: string, password: string) =>
    API.post("/signin", { email, password });

export const passwordResetRequest = (email: string) =>
    API.post("/password-reset-request", { email });

export const passwordReset = (token: string, newPassword: string) =>
    API.post("/password-reset", { token, newPassword });

export const getMe = (token: string) =>
    API.get("/me", { headers: { Authorization: `Bearer ${token}` } });
