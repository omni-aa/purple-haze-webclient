import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import {signup} from "@/api/auth.ts";

export const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await signup(username, email, password);
            navigate("/signin");
        } catch (err: any) {
            setError(err.response?.data?.error || "Error signing up");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

            {error && <div className="text-red-500 mb-2">{error}</div>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Username"
                    className="border p-2 rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

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

                <button className="bg-blue-500 text-white p-2 rounded">
                    Sign Up
                </button>
            </form>

            <p className="mt-2 text-sm">
                Already have an account?{" "}
                <Link to="/signin" className="text-blue-500">
                    Sign In
                </Link>
            </p>
        </div>
    );
};
