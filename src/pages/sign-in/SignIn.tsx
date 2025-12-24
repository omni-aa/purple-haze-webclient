import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import {signin} from "@/api/auth.ts";

export const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await signin(email, password);
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.error || "Invalid credentials");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Sign In</h1>

            {error && <div className="text-red-500 mb-2">{error}</div>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className="bg-green-500 text-white p-2 rounded">
                    Sign In
                </button>
            </form>

            <p className="mt-2 text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="text-blue-500">
                    Sign Up
                </Link>
                <Link to={"/"}>
                    HOME PAGE
                </Link>
            </p>

            <p className="mt-1 text-sm">
                Forgot password?{" "}
                <Link to="/forgot-password" className="text-blue-500">
                    Reset
                </Link>
            </p>
        </div>
    );
};
