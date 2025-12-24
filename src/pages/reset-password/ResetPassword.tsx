import React, { useState, useEffect } from "react";
import { passwordReset } from "@/api/auth";
import { useNavigate } from "react-router-dom";

export const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const navigate = useNavigate();

    // Extract token from URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const t = params.get("token");
        if (!t) setMessage("Invalid reset link");
        setToken(t);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;

        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            await passwordReset(token, newPassword);
            setMessage("Password successfully reset! Redirecting to login...");
            setTimeout(() => navigate("/signin"), 3000);
        } catch (err: any) {
            setMessage(err.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

            {message && <p className="mt-4 text-green-600">{message}</p>}

            {!message?.includes("successfully") && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="border p-2 rounded"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border p-2 rounded"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`p-2 rounded text-white ${
                            loading ? "bg-gray-400" : "bg-blue-500"
                        }`}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            )}
        </div>
    );
};
